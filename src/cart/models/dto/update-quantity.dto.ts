import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateQuantityDto {
  @IsNotEmpty()
  @IsInt()
  quantity: number;
}
