import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { RegisterDto } from './models/register.dto';
import { LoginDto } from './models/login.dto';
import { AuthService } from './auth.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @Post('login')
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.login(body, response);
  }

  @Get('user')
  async getUserWithCookie(@Req() request: Request) {
    return this.authService.getUserWithCookie(request);
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    return this.authService.logout(response);
  }
}
