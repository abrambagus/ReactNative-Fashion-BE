import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Request,
  Post,
  UseGuards,
  UseInterceptors,
  Get,
} from '@nestjs/common';
import { RegisterDto } from './models/register.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './models/login.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Get('user')
  @UseGuards(AuthGuard('jwt'))
  async getUserWithToken(@Request() request) {
    return request.user;
  }
}
