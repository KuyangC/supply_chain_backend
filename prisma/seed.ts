import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
const prisma = new PrismaClient();
async function main() {
  // Hash password
  const hashedPassword = await bcrypt.hash('admin123', 10);

  // Create Admin User
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Super Admin',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  // Create Manager User
  const manager = await prisma.user.upsert({
    where: { email: 'manager@example.com' },
    update: {},
    create: {
      email: 'manager@example.com',
      name: 'Warehouse Manager',
      password: await bcrypt.hash('manager123', 10),
      role: 'MANAGER',
    },
  });

  // Create Operator User
  const operator = await prisma.user.upsert({
    where: { email: 'operator@example.com' },
    update: {},
    create: {
      email: 'operator@example.com',
      name: 'Warehouse Operator',
      password: await bcrypt.hash('operator123', 10),
      role: 'OPERATOR',
    },
  });

  console.log('Seed completed!');
  console.log('Users created:');
  console.log('  - admin@example.com / admin123 (ADMIN)');
  console.log('  - manager@example.com / manager123 (MANAGER)');
  console.log('  - operator@example.com / operator123 (OPERATOR)');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
