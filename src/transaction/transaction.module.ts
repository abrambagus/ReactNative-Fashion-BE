import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './models/transaction.entity';
import { CartModule } from '../cart/cart.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction]), CartModule, UserModule],
  providers: [TransactionService],
  controllers: [TransactionController],
})
export class TransactionModule {}
