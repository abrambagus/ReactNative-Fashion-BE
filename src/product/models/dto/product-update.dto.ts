import { IsOptional, ValidateNested } from 'class-validator';

class Sizes {
  @IsOptional()
  name?: string;
}

export class ProductUpdateDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  brand?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  price?: number;

  @IsOptional()
  @ValidateNested({ each: true })
  sizes?: Sizes[];
}
