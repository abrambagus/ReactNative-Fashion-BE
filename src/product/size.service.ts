import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Size } from './models/size.entity';

@Injectable()
export class SizeService {
  constructor(
    @InjectRepository(Size)
    private readonly sizeRepository: Repository<Size>,
  ) {}

  async getAllSizesService(): Promise<Size[]> {
    return await this.sizeRepository.find();
  }

  async createSizeService(data: any): Promise<Size> {
    return await this.sizeRepository.save(data);
  }

  async deleteSizeService(id: number): Promise<any> {
    const existSize = await this.sizeRepository.findOne({ id });
    if (!existSize) {
      throw new NotFoundException('Size Not Found!');
    }
    const sizeDeleted = await this.sizeRepository.remove(existSize);
    return {
      message: `Size ${sizeDeleted.name} succefully deleted`,
    };
  }
}
