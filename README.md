# Supply Chain Backend API

Backend untuk sistem tracking supply chain dengan **NestJS + Prisma + MySQL**.

## Tech Stack

- **Framework**: NestJS 11
- **ORM**: Prisma 6
- **Database**: MySQL
- **Validation**: class-validator, class-transformer

## Prerequisites

- Node.js 18+
- MySQL (Laragon / XAMPP / MySQL Server)
- npm atau yarn

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Database

Buat database MySQL bernama `supply_chain_db`:

```sql
CREATE DATABASE supply_chain_db;
```

### 3. Configure Environment

Buat file `.env` di root project:

```env
DATABASE_URL="mysql://root@localhost:3306/supply_chain_db"
```

Untuk Laragon dengan password:

```env
DATABASE_URL="mysql://root:password@localhost:3306/supply_chain_db"
```

### 4. Run Migration

```bash
npx prisma migrate dev
```

### 5. Start Development Server

```bash
npm run start:dev
```

Server berjalan di `http://localhost:3000`

## API Endpoints

### Users

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/users` | Get all users |
| GET | `/users/:id` | Get user by ID |
| POST | `/users` | Create new user |
| PATCH | `/users/:id` | Update user |
| DELETE | `/users/:id` | Delete user |

### Create User (POST /users)

**Request Body:**

```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "password123",
  "role": "VIEWER"
}
```

**Available Roles:**
- `ADMIN`
- `MANAGER`
- `OPERATOR`
- `VIEWER`

### Products

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/products` | Get all products |
| GET | `/products/:id` | Get product by ID |
| POST | `/products` | Create new product |
| PATCH | `/products/:id` | Update product |
| DELETE | `/products/:id` | Delete product |

### Locations

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/locations` | Get all locations |
| GET | `/locations/:id` | Get location by ID |
| POST | `/locations` | Create new location |
| PATCH | `/locations/:id` | Update location |
| DELETE | `/locations/:id` | Delete location |

### Inventory

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/inventory` | Get all inventory |
| GET | `/inventory/:id` | Get inventory by ID |
| POST | `/inventory` | Add stock to location |
| PATCH | `/inventory/:id` | Update inventory |
| DELETE | `/inventory/:id` | Delete inventory |

### Shipments

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/shipments` | Get all shipments |
| GET | `/shipments/:id` | Get shipment by ID |
| POST | `/shipments` | Create new shipment |
| PATCH | `/shipments/:id` | Update shipment status |
| DELETE | `/shipments/:id` | Delete shipment |

## Database Schema

```
User         - Pengguna sistem dengan role
Product      - Produk dengan SKU, stok, kategori
Location     - Lokasi gudang/warehouse
Inventory    - Stok per produk per lokasi
Shipment     - Pengiriman antar lokasi
ShipmentItem - Item dalam pengiriman
```

## Project Structure

```
src/
├── main.ts              - Entry point
├── app.module.ts        - Root module
├── prisma.service.ts    - Prisma Client wrapper
├── prisma.module.ts     - Prisma module (Global)
├── users/               - Users module
│   ├── users.controller.ts
│   ├── users.service.ts
│   ├── users.module.ts
│   └── dto/
│       ├── create-user.dto.ts
│       └── update-user.dto.ts
```

## Available Scripts

| Command | Deskripsi |
|---------|-----------|
| `npm run start` | Start production mode |
| `npm run start:dev` | Start development mode with watch |
| `npm run start:debug` | Start with debug mode |
| `npm run build` | Build project |
| `npx prisma studio` | Open Prisma Studio (GUI) |
| `npx prisma migrate dev` | Run migration |
| `npx prisma generate` | Generate Prisma Client |

## Environment Variables

| Variable | Deskripsi | Default |
|----------|-----------|---------|
| `DATABASE_URL` | MySQL connection string | - |

Format: `mysql://user:password@host:port/database`

## Status Shipment

- `PENDING` - Menunggu konfirmasi
- `CONFIRMED` - Sudah dikonfirmasi
- `PICKED_UP` - Barang diambil
- `IN_TRANSIT` - Dalam perjalanan
- `DELIVERED` - Sampai tujuan
- `FAILED` - Gagal
- `CANCELLED` - Dibatalkan

## License

MIT
