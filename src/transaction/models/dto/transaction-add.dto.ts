import { IsNotEmpty } from 'class-validator';

export class TransactionAddDto {
  @IsNotEmpty()
  totalPrice: number;
}
