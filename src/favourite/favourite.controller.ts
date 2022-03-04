import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Delete,
  Param,
  Get,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FavouriteService } from './favourite.service';

@Controller('favourite')
export class FavouriteController {
  constructor(private readonly favouriteService: FavouriteService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async addProductToFavourite(@Request() req: any, @Body() body: any) {
    return await this.favouriteService.addProductToFavouriteService(
      req.user.id,
      body,
    );
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getAllFavourites(@Request() req: any): Promise<any> {
    return await this.favouriteService.getAllFavouritesService(req.user.id);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  async deleteFavouriteById(@Param('id', ParseIntPipe) favId: number) {
    return await this.favouriteService.deleteFavouriteByIdService(favId);
  }
}
