import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './models/cart.entity';
import { ProductOnCart } from './models/productOnCart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(ProductOnCart)
    private readonly productOnCartRepository: Repository<ProductOnCart>,
  ) {}

  async findAllCartService() {
    return await this.cartRepository.find({
      relations: ['user', 'productOnCart'],
    });
  }

  async findAllProductOnCartService() {
    return await this.productOnCartRepository.find({
      relations: ['cart', 'product'],
    });
  }
}
