import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './models/cart.entity';
import { AddItemToCartDto } from './models/dto/add-item-to-cart.dto';
import { UpdateQuantityDto } from './models/dto/update-quantity.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
  ) {}

  async findCartByUserService(userId: number): Promise<Cart[]> {
    return await this.cartRepository.find({
      relations: ['user', 'product'],
      where: { user: { id: userId } },
    });
  }

  async addItemToCartService(
    userId: number,
    body: AddItemToCartDto,
  ): Promise<Cart> {
    return await this.cartRepository.save({
      product: {
        id: body.productId,
      },
      user: {
        id: userId,
      },
      quantity: body.quantity,
      size: body.size,
      name: body.name,
      image: body.image,
      price: body.price,
    });
  }

  async editQtyByidService(
    cartId: number,
    updateQty: UpdateQuantityDto,
  ): Promise<any> {
    const updateCart = await this.cartRepository.findOne({ id: cartId });
    if (!updateCart) {
      throw new NotFoundException('Cart not found');
    }

    return await this.cartRepository.update(cartId, {
      quantity: updateQty.quantity,
    });
  }

  async deleteCartByIdService(id: number): Promise<Cart> {
    const cartData = await this.cartRepository.findOne({ id });
    if (!cartData) {
      throw new NotFoundException('Cart not found');
    }

    return await this.cartRepository.remove(cartData);
  }

  async deleteCartService(userId: number): Promise<any> {
    const cart = await this.cartRepository.find({
      relations: ['user', 'product'],
      where: {
        user: {
          id: userId,
        },
      },
    });
    if (!cart.length) {
      throw new NotFoundException('Cart not found');
    }
    return await this.cartRepository.remove(cart);
  }
}
