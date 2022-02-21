import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ProductAddDto } from './models/dto/product-add.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProducts(@Query('page', ParseIntPipe) page = 1) {
    return await this.productService.findAllPaginatedProduct(page);
  }

  @Post()
  async createProduct(@Body() body: ProductAddDto) {
    return await this.productService.createProductService(body);
  }
}
