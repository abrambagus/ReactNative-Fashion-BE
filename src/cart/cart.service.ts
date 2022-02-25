import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './models/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
  ) {}

  async findCartByUserService(userId: number) {
    return await this.cartRepository.find({
      relations: ['user', 'product'],
      where: { user: { id: userId } },
    });
  }
}
