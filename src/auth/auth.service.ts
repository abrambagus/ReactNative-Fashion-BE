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

  public getTokenForUser(user: User): string {
    return this.jwtService.sign({
      email: user.email,
      sub: user.id,
    });
  }

  async signUp(body): Promise<User> {
    const user = await this.userService.findOne({ email: body.email });

    if (user) {
      throw new BadRequestException('Email already taken');
    }

    if (body.password !== body.passwordConfirmation) {
      throw new BadRequestException('Password do not match');
    }
    const hashed = await bcrypt.hash(body.password, 12);
    const newUser = await this.userService.create({
      email: body.email,
      password: hashed,
    });
    return this.userService.findOne(newUser);
  }

  async login(body): Promise<{ user: User; token: string }> {
    const user = await this.userService.findOne({ email: body.email });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!(await bcrypt.compare(body.password, user.password))) {
      throw new BadRequestException('Invalid credentials');
    }

    const jwt = this.getTokenForUser(user);
    return {
      user: user,
      token: jwt,
    };
  }
}
