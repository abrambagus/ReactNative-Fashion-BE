import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Res,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';
import { extname } from 'path';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';

@Controller('profile-picture')
export class UploadUserProfilePictureController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './assets/profile-pictures',
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
    @Request() req: any,
  ) {
    const user = await this.userService.findOne(req.user.id);
    if (user) {
      await this.userService.updateUserService(req.user.id, {
        profilePicture: file.filename,
      });
      return {
        message: 'Upload Image Success',
      };
    } else {
      throw new NotFoundException('User Not Found');
    }
  }

  @Get('/:path')
  async getImageProduct(@Param('path') path: string, @Res() res: Response) {
    return res.sendFile(path, { root: 'assets/profile-pictures' });
  }
}
