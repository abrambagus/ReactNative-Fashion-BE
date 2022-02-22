import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ProductService } from './product.service';

@Controller()
export class UploadProductImageController {
  constructor(private readonly productService: ProductService) {}

  @Post('product-image/:id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './assets/product-images',
        filename(_, file, callback) {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return callback(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: number,
  ) {
    const product = await this.productService.getOneProduct(id);
    if (product) {
      await this.productService.uploadImageProduct(id, {
        image: file.filename,
      });
      return {
        message: 'Upload Image Success',
      };
    } else {
      throw new BadRequestException('Product Not Found');
    }
  }
}
