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
import { SignUpDto } from './models/signUp.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './models/login.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() body: SignUpDto) {
    return this.authService.signUp(body);
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Get('user')
  @UseGuards(AuthGuard('jwt'))
  async getUserWithToken(@Request() req: any) {
    return req.user;
  }
}
