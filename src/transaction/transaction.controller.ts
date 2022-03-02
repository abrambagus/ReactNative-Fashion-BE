import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TransactionAddDto } from './models/dto/transaction-add.dto';
import { TransactionService } from './transaction.service';

@Controller('transaction')
@UseInterceptors(ClassSerializerInterceptor)
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getTransactionHistory(@Request() req: any) {
    return await this.transactionService.getTransactionService(req.user.id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async addTransaction(@Request() req: any, @Body() body: TransactionAddDto) {
    return await this.transactionService.addTransactionService(
      req.user.id,
      body,
    );
  }
}
