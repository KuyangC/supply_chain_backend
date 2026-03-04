import { IsString, IsInt, IsOptional, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  sku: string;

  @IsString()
  name: string;

  @IsString()
  category: string;

  @IsString()
  unit: string;

  @IsInt()
  @Min(0)
  stock: number;

  @IsInt()
  @Min(0)
  minStock: number;

  @IsString()
  @IsOptional()
  tags?: string;

  @IsString()
  @IsOptional()
  status?: string;
}
