import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductAddDto } from './models/dto/product-add.dto';
import { ProductUpdateDto } from './models/dto/product-update.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProducts() {
    return await this.productService.findAllProduct();
  }

  @Post()
  async createProduct(@Body() body: ProductAddDto) {
    return await this.productService.createProductService(body);
  }

  @Patch('/:id')
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: ProductUpdateDto,
  ) {
    return await this.productService.updateProductService(id, body);
  }

  @Delete('/:id')
  async deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return await this.productService.deleteProductService(id);
  }
}
