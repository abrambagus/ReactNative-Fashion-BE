import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { Cart } from './models/cart.entity';
import { ProductOnCart } from './models/productOnCart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, ProductOnCart])],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
