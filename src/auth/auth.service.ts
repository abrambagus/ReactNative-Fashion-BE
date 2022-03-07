import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../user/models/user.entity';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './models/signUp.dto';
import { LoginDto } from './models/login.dto';

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

  async signUp(data: SignUpDto): Promise<User> {
    const user = await this.userService.findOne({ email: data.email });

    if (user) {
      throw new BadRequestException('Email already taken');
    }

    if (data.password.length < 2 || data.password.length > 50) {
      throw new BadRequestException(
        'Password needs to be between 2 - 50 character',
      );
    }

    if (data.password !== data.passwordConfirmation) {
      throw new BadRequestException('Password do not match');
    }
    const hashed = await bcrypt.hash(data.password, 12);
    const newUser = await this.userService.create({
      email: data.email,
      password: hashed,
    });
    return this.userService.findOne(newUser);
  }

  async login(data: LoginDto): Promise<{ user: User; token: string }> {
    const user = await this.userService.findOne({ email: data.email });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!(await bcrypt.compare(data.password, user.password))) {
      throw new BadRequestException('Invalid credentials');
    }

    const jwt = this.getTokenForUser(user);
    return {
      user: user,
      token: jwt,
    };
  }
}
