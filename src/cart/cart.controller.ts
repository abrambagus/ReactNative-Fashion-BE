import {
  Controller,
  Get,
  UseGuards,
  Request,
  UseInterceptors,
  ClassSerializerInterceptor,
  Post,
  Body,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CartService } from './cart.service';
import { AddItemToCartDto } from './models/dto/add-item-to-cart.dto';
import { UpdateQuantityDto } from './models/dto/update-quantity.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuard('jwt'))
  async getAllProducts(@Request() req: any) {
    return await this.cartService.findCartByUserService(req.user.id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async addItemToCart(@Request() req: any, @Body() body: AddItemToCartDto) {
    return this.cartService.addItemToCartService(req.user.id, body);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard('jwt'))
  async editCartById(
    @Param('id', ParseIntPipe) cartId: number,
    @Body() body: UpdateQuantityDto,
  ) {
    return this.cartService.editQtyByidService(cartId, body);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  async deleteCartById(@Param('id', ParseIntPipe) cartId: number) {
    return this.cartService.deleteCartByIdService(cartId);
  }
}
