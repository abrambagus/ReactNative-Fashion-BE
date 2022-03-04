import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favourite } from './models/favourite.entity';

@Injectable()
export class FavouriteService {
  constructor(
    @InjectRepository(Favourite)
    private readonly favouriteRepository: Repository<Favourite>,
  ) {}

  async addProductToFavouriteService(
    userId: any,
    data: any,
  ): Promise<Favourite> {
    return await this.favouriteRepository.save({
      user: {
        id: userId,
      },
      product: {
        id: data.productId,
      },
    });
  }

  async getAllFavouritesService(userId: number): Promise<any> {
    return await this.favouriteRepository.find({
      where: { user: { id: userId } },
      relations: ['product'],
    });
  }

  async deleteFavouriteByIdService(favId: number): Promise<any> {
    return await this.favouriteRepository.delete({ id: favId });
  }
}
