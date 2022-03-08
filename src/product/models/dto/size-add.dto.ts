import { IsNotEmpty, IsString } from 'class-validator';

export class SizeAddDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
