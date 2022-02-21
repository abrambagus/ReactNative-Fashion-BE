import { IsNotEmpty } from 'class-validator';

export class SizeAddDto {
  @IsNotEmpty()
  name: string;
}
