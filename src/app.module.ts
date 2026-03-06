import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { LocationsModule } from './locations/locations.module';
import { InventoryModule } from './inventory/inventory.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    ProductsModule,
    LocationsModule,
    InventoryModule,
  ],
  controllers: [],
})
export class AppModule {}
