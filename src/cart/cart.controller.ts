import {
  Controller,
  Get,
  UseGuards,
  Request,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuard('jwt'))
  async getAllProducts(@Request() req: any) {
    return await this.cartService.findCartByUserService(req.user.id);
  }
}
