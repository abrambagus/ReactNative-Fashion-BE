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
  getAllSizes() {
    return this.sizeService.getAllSizesService();
  }

  @Post()
  createSize(@Body() body: SizeAddDto) {
    return this.sizeService.createSizeService(body);
  }

  @Delete('/:id')
  deleteSize(@Param('id', ParseIntPipe) id: number) {
    return this.sizeService.deleteSizeService(id);
  }
}
