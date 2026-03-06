import {
  IsString,
  IsInt,
  IsOptional,
  IsDateString,
  Min,
} from 'class-validator';

export class CreateInventoryDto {
  @IsString()
  productId: string;

  @IsString()
  locationId: string;

  @IsString()
  @IsOptional()
  batch?: string;

  @IsInt()
  @Min(0)
  qty: number;

  @IsInt()
  @Min(0)
  reserved: number;

  @IsInt()
  @Min(0)
  available: number;

  @IsDateString()
  @IsOptional()
  expiry?: string;
}
