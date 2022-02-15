import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './models/register.dto';
import { LoginDto } from './models/login.dto';

@Controller()
export class AuthController {
  constructor(private userService: UserService) {}

  @Post('register')
  async register(@Body() body: RegisterDto) {
    if (body.password !== body.password_confirm) {
      throw new BadRequestException('Password do not match');
    }

    const hashed = await bcrypt.hash(body.password, 12);
    return this.userService.create({
      email: body.email,
      password: hashed,
    });
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    const user = await this.userService.findOne({ email: body.email });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!(await bcrypt.compare(body.password, user.password))) {
      throw new BadRequestException('Invalid credentials');
    }

    return user;
  }
}
