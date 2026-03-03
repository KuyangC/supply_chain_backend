Backend Setup Guide - NestJS + Prisma + MySQL                                                                                                                                                                                                                                                                       
  Project Structure                                                                                                                                        
  
  D:\Ndut\
  ├── supply-chain-tracking\      ← Frontend (Next.js)
  └── supply-chain-backend\       ← Backend (NestJS)

  Step-by-Step Setup Checklist

  Phase 1: Create NestJS Project

  - Open terminal at D:\Ndut\
  - Run: npx @nestjs/cli new supply-chain-backend --package-manager npm --skip-git
  - Enter folder: cd supply-chain-backend
  - Test: npm run start:dev
  - Open http://localhost:3000 - should see "Welcome to NestJS!"
  - Stop server (Ctrl + C)

  Phase 2: Setup MySQL Database

  - Install MySQL if needed
  - Open MySQL Workbench / DBeaver
  - Create database: CREATE DATABASE supply_chain_db;
  - Note credentials:
    - Host: localhost
    - Port: 3306
    - User: root
    - Password: YOUR_PASSWORD
    - Database: supply_chain_db

  Phase 3: Install Prisma & MySQL Driver

  - In supply-chain-backend folder:
  npm install prisma @prisma/client
  npm install mysql2
  - Initialize Prisma: npx prisma init
  - Check prisma/ folder created

  Phase 4: Configure Database Connection

  - Open .env file
  - Update DATABASE_URL:
  DATABASE_URL="mysql://root:YOUR_PASSWORD@localhost:3306/supply_chain_db"

  Phase 5: Define Prisma Schema

  - Open prisma/schema.prisma
  - Change provider to mysql
  - Add models (copy schema from chat above)

  Phase 6: Run Migration

  - Run: npx prisma migrate dev --name init
  - Check MySQL Workbench - tables created
  - Run: npx prisma generate

  Phase 7: Create Prisma Service

  - Create folder: src/database/
  - Create file: src/database/prisma.service.ts
  import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
  import { PrismaClient } from '@prisma/client';

  @Injectable()
  export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    async onModuleInit() {
      await this.$connect();
    }

    async onModuleDestroy() {
      await this.$disconnect();
    }
  }

  Phase 8: Create User Module

  - Run: npx nest g module users
  - Run: npx nest g service users
  - Run: npx nest g controller users

  Phase 9: Test API

  - Run: npm run start:dev
  - Test: GET http://localhost:3000/users
  - Test: POST http://localhost:3000/users

  Phase 10: Additional Dependencies

  npm install class-validator class-transformer
  npm install @nestjs/config
  npm install @nestjs/jwt @nestjs/passport passport passport-jwt
  npm install bcrypt
  npm install -D @types/passport-jwt @types/bcrypt

  Prisma Schema (Full)

  datasource db {
    provider = "mysql"
    url      = env("DATABASE_URL")
  }

  generator client {
    provider = "prisma-client-js"
  }

  enum Role {
    ADMIN
    MANAGER
    OPERATOR
    VIEWER
  }

  enum ShipmentStatus {
    PENDING
    CONFIRMED
    PICKED_UP
    IN_TRANSIT
    DELIVERED
    FAILED
    CANCELLED
  }

  model User {
    id        String   @id @default(uuid())
    email     String   @unique
    name      String
    password  String
    role      Role     @default(VIEWER)
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
    shipments Shipment[]
  }

  model Product {
    id          String   @id @default(uuid())
    sku         String   @unique
    name        String
    category    String
    unit        String
    stock       Int      @default(0)
    minStock    Int      @default(10)
    tags        String?
    status      String   @default("ACTIVE")
    createdAt   DateTime @default(now())
    updatedAt   DateTime @updatedAt
    inventory   Inventory[]
    shipmentItems ShipmentItem[]
  }

  model Location {
    id        String   @id @default(uuid())
    name      String
    address   String?
    type      String   @default("WAREHOUSE")
    createdAt DateTime @default(now())
    inventory Inventory[]
    shipments Shipment[]
  }

  model Inventory {
    id          String   @id @default(uuid())
    productId   String
    locationId  String
    batch       String?
    qty         Int      @default(0)
    reserved    Int      @default(0)
    available   Int      @default(0)
    expiry      DateTime?
    createdAt   DateTime @default(now())
    updatedAt   DateTime @updatedAt
    product     Product  @relation(fields: [productId], references: [id])
    location    Location @relation(fields: [locationId], references: [id])
    @@unique([productId, locationId, batch])
  }

  model Shipment {
    id             String          @id @default(uuid())
    trackingId     String          @unique
    fromLocationId String
    toLocationId   String
    status         ShipmentStatus  @default(PENDING)
    userId         String
    notes          String?
    createdAt      DateTime        @default(now())
    updatedAt      DateTime        @updatedAt
    fromLocation   Location        @relation(fields: [fromLocationId], references: [id])
    toLocation     Location        @relation(fields: [toLocationId], references: [id])
    user           User            @relation(fields: [userId], references: [id])
    items          ShipmentItem[]
  }

  model ShipmentItem {
    id         String   @id @default(uuid())
    shipmentId String
    productId  String
    qty        Int
    createdAt  DateTime @default(now())
    shipment   Shipment @relation(fields: [shipmentId], references: [id])
    product    Product  @relation(fields: [productId], references: [id])
  }
