import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';
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
    const product = await this.productService.getOneProductService(id);
    if (product) {
      await this.productService.uploadImageProduct(id, {
        image: file.filename,
      });
      return {
        message: 'Upload Image Success',
      };
    } else {
      throw new NotFoundException('Product Not Found');
    }
  }

  @Get('product-image/:path')
  async getImageProduct(@Param('path') path: string, @Res() res: Response) {
    return res.sendFile(path, { root: 'assets/product-images' });
  }
}
