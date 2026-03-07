import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { LocationsModule } from './locations/locations.module';
import { ShipmentModule } from './shipment/shipment.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    ProductsModule,
    LocationsModule,
    ShipmentModule,
  ],
  controllers: [],
})
export class AppModule {}
