import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

class Sizes {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class ProductAddDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  brand: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsInt()
  price: number;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Sizes)
  sizes: Sizes[];
}
