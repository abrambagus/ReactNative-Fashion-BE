import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './models/product.entity';
import { Size } from './models/size.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Size)
    private readonly sizeRepository: Repository<Size>,
  ) {}

  async findAllProduct(): Promise<Product[]> {
    return await this.productRepository.find({ relations: ['sizes'] });
  }

  async findAllSizes(): Promise<Size[]> {
    return await this.sizeRepository.find({ relations: ['products'] });
  }
}
