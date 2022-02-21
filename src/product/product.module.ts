import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './models/product.entity';
import { Size } from './models/size.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { SizeController } from './size.controller';
import { SizeService } from './size.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Size])],
  controllers: [ProductController, SizeController],
  providers: [ProductService, SizeService],
})
export class ProductModule {}
