import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../user/models/user.entity';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(body): Promise<User> {
    const user = await this.userService.findOne({ email: body.email });

    if (user) {
      throw new BadRequestException('Email already taken');
    }

    if (body.password !== body.password_confirm) {
      throw new BadRequestException('Password do not match');
    }
    const hashed = await bcrypt.hash(body.password, 12);
    return this.userService.create({
      email: body.email,
      password: hashed,
    });
  }

  async login(body, response): Promise<User> {
    const user = await this.userService.findOne({ email: body.email });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!(await bcrypt.compare(body.password, user.password))) {
      throw new BadRequestException('Invalid credentials');
    }

    const jwt = await this.jwtService.signAsync({ id: user.id });

    response.cookie('jwt', jwt, { httpOnly: true });

    return user;
  }

  async getUserWithCookie(request): Promise<User> {
    const cookie = request.cookies['jwt'];

    const data = await this.jwtService.verifyAsync(cookie);

    return this.userService.findOne({ id: data['id'] });
  }

  async logout(response): Promise<object> {
    response.clearCookie('jwt');

    return {
      message: 'Success',
    };
  }
}
