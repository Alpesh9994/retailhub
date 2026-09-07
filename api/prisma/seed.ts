/**
 * RetailHub — Prisma Seed Script
 * Creates the default admin user for development/testing.
 *
 * Run with: npx ts-node prisma/seed.ts
 * Or add to package.json scripts: "seed": "ts-node prisma/seed.ts"
 */
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  const passwordHash = await bcrypt.hash('password123', 12);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@retailhub.com' },
    update: {},
    create: {
      email: 'admin@retailhub.com',
      passwordHash,
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
      isActive: true,
    },
  });

  console.log('✅ Admin user ready:', admin.email);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
