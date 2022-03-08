import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './models/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async all(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async create(data: any): Promise<User> {
    return await this.userRepository.save(data);
  }

  async findOne(condition: any): Promise<User> {
    return await this.userRepository.findOne(condition);
  }

  async updateUserService(userId: number, data: any): Promise<User> {
    const { password, ...resData } = data;
    let newData = data;

    if (password) {
      if (password.length < 2 || password.length > 50) {
        throw new BadRequestException(
          'Password needs to be between 2 - 50 character',
        );
      }
      const hashed = await bcrypt.hash(password, 12);
      newData = {
        password: hashed,
        ...resData,
      };
    }

    await this.userRepository.update(userId, newData);
    return this.findOne(userId);
  }

  async deleteUserService(userId: number): Promise<any> {
    return await this.userRepository.delete(userId);
  }
}
