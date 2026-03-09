import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ShipmentStatus } from '@prisma/client';

export class CreateShipmentDto {
  @IsString()
  trackingId: string;

  @IsString()
  fromLocationId: string;

  @IsString()
  toLocationId: string;

  @IsEnum(ShipmentStatus)
  @IsOptional()
  status?: ShipmentStatus;

  @IsString()
  userId: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
