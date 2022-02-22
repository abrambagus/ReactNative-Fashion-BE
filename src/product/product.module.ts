import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './models/product.entity';
import { Size } from './models/size.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { SizeController } from './size.controller';
import { SizeService } from './size.service';
import { UploadProductImageController } from './upload-product-image.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Size])],
  controllers: [
    ProductController,
    SizeController,
    UploadProductImageController,
  ],
  providers: [ProductService, SizeService],
})
export class ProductModule {}
