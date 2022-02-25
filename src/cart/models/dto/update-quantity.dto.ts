import { IsNotEmpty } from 'class-validator';

export class UpdateQuantityDto {
  @IsNotEmpty()
  quantity: number;
}
