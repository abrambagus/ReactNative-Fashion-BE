import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { SizeAddDto } from './models/dto/size-add.dto';
import { SizeService } from './size.service';

@Controller('size')
export class SizeController {
  constructor(private readonly sizeService: SizeService) {}

  @Get()
  async getAllSizes() {
    return await this.sizeService.getAllSizesService();
  }

  @Post()
  async createSize(@Body() body: SizeAddDto) {
    return await this.sizeService.createSizeService(body);
  }

  @Delete('/:id')
  async deleteSize(@Param('id', ParseIntPipe) id: number) {
    return await this.sizeService.deleteSizeService(id);
  }
}
