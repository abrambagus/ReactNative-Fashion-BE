import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserUpdateDto } from './models/dto/user-update.dto';
import { User } from './models/user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async all(): Promise<User[]> {
    return this.userService.all();
  }

  @Patch()
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuard('jwt'))
  async updateUser(@Request() req: any, @Body() body: UserUpdateDto) {
    return await this.userService.updateUserService(req.user.id, body);
  }

  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) userId: number) {
    return await this.userService.deleteUserService(userId);
  }
}
