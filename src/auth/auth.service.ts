import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../user/models/user.entity';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

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

  async login(body): Promise<User> {
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
