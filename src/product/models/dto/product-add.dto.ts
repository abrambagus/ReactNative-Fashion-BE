import { IsNotEmpty } from 'class-validator';

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
  sizes: Sizes[];
}
