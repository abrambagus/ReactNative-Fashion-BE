import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductAddDto } from './models/dto/product-add.dto';
import { ProductUpdateDto } from './models/dto/product-update.dto';
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

  async createProductService(data: ProductAddDto): Promise<Product> {
    const product = new Product();
    product.name = data.name;
    product.brand = data.brand;
    product.description = data.description;
    product.price = data.price;
    product.sizes = await Promise.all(
      data.sizes.map(async (size) => {
        const existSize = await this.sizeRepository.findOne({
          name: size.name,
        });
        if (existSize) {
          return existSize;
        } else {
          throw new NotFoundException(
            'Size Not Found, Please Create Size First',
          );
        }
      }),
    );
    return await this.productRepository.save(product);
  }

  async getOneProductService(condition: any): Promise<Product> {
    return await this.productRepository.findOne(condition, {
      relations: ['sizes'],
    });
  }

  async uploadImageProduct(id: number, data: any): Promise<any> {
    return await this.productRepository.update(id, data);
  }

  async updateProductService(
    id: number,
    data: ProductUpdateDto,
  ): Promise<Product> {
    const productExist = await this.getOneProductService(id);
    if (!productExist) {
      throw new NotFoundException(`Product Doesn't Exist`);
    }

    const { sizes } = data;
    if (!sizes) {
      await this.productRepository.save({ id: id, ...data });
    } else {
      const updatedSize = await Promise.all(
        data.sizes.map(async (size) => {
          const existSize = await this.sizeRepository.findOne({
            name: size.name,
          });
          if (existSize) {
            return existSize;
          } else {
            throw new NotFoundException(
              'Size Not Found, Please Create Size First',
            );
          }
        }),
      );
      await this.productRepository.save({
        id: id,
        name: data.name,
        brand: data.brand,
        description: data.description,
        price: data.price,
        sizes: updatedSize,
      });
    }
    return this.getOneProductService(id);
  }

  async findAllProduct() {
    return await this.productRepository.find({
      relations: ['sizes'],
    });
  }

  async deleteProductService(id: number) {
    const productExist = await this.getOneProductService(id);
    if (!productExist) {
      throw new NotFoundException(`Product Doesn't Exist`);
    }

    const deletedProduct = await this.productRepository.remove(productExist);
    return {
      message: `Product ${deletedProduct.name} succefully deleted`,
    };
  }
}
