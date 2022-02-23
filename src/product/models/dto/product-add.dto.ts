import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';

class Sizes {
  @IsNotEmpty()
  name: string;
}

export class ProductAddDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  brand: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Sizes)
  sizes: Sizes[];
}
