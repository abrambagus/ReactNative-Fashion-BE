import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartService } from '../cart/cart.service';
import { UserService } from '../user/user.service';
import { TransactionAddDto } from './models/dto/transaction-add.dto';
import { Transaction } from './models/transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    private readonly userService: UserService,
    private readonly cartService: CartService,
  ) {}

  async getTransactionService(userId: number): Promise<Transaction[]> {
    return await this.transactionRepository.find({
      relations: ['user'],
      where: { user: { id: userId } },
    });
  }

  async addTransactionService(
    userId: number,
    data: TransactionAddDto,
  ): Promise<Transaction> {
    const currentUser = await this.userService.findOne(userId);
    await this.cartService.deleteCart(userId);
    return await this.transactionRepository.save({
      totalPrice: data.totalPrice,
      user: currentUser,
    });
  }
}
