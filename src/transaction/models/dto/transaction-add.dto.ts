import { IsInt, IsNotEmpty } from 'class-validator';

export class TransactionAddDto {
  @IsNotEmpty()
  @IsInt()
  totalPrice: number;
}
