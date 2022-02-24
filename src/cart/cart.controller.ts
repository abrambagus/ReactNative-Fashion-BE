import { Controller, Get } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async getAllProducts() {
    return await this.cartService.findAllCartService();
  }

  @Get('products-on-cart')
  async getAllProductOnCart() {
    return await this.cartService.findAllProductOnCartService();
  }
}
