/**
 * RetailHub — Prisma Seed Script
 * Creates the default admin user, categories, and initial product catalog.
 *
 * Run with: npx ts-node prisma/seed.ts
 */
import { PrismaClient, ProductStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // 1. Seed Admin User
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

  // 2. Seed Categories
  const electronics = await prisma.category.upsert({
    where: { slug: 'electronics' },
    update: {},
    create: {
      name: 'Electronics',
      slug: 'electronics',
      description: 'Consumer gadgets, computing devices, and accessories',
    },
  });

  const apparel = await prisma.category.upsert({
    where: { slug: 'apparel' },
    update: {},
    create: {
      name: 'Apparel',
      slug: 'apparel',
      description: 'Premium clothing, outerwear, and footwear',
    },
  });

  const homeLiving = await prisma.category.upsert({
    where: { slug: 'home-living' },
    update: {},
    create: {
      name: 'Home & Living',
      slug: 'home-living',
      description: 'Furniture, smart home devices, and interior decor',
    },
  });
  console.log('✅ Categories seeded: Electronics, Apparel, Home & Living');

  // 3. Seed Sample Products
  const sampleProducts = [
    {
      sku: 'PRD-ELEC-001',
      name: 'Wireless Noise-Canceling Headphones',
      description: 'Over-ear headphones with active noise cancellation and 30-hour battery life.',
      price: 199.99,
      stock: 45,
      status: ProductStatus.ACTIVE,
      categoryId: electronics.id,
    },
    {
      sku: 'PRD-ELEC-002',
      name: 'Ergonomic Mechanical Keyboard',
      description: 'Custom hot-swappable mechanical switches with RGB backlighting.',
      price: 129.50,
      stock: 28,
      status: ProductStatus.ACTIVE,
      categoryId: electronics.id,
    },
    {
      sku: 'PRD-ELEC-003',
      name: 'Ultra-Wide 4K Gaming Monitor',
      description: '34-inch curved display with 144Hz refresh rate and HDR600 support.',
      price: 449.00,
      stock: 12,
      status: ProductStatus.ACTIVE,
      categoryId: electronics.id,
    },
    {
      sku: 'PRD-APP-001',
      name: 'Merino Wool Winter Jacket',
      description: 'Water-resistant, breathable premium wool jacket tailored for cold climates.',
      price: 89.99,
      stock: 60,
      status: ProductStatus.ACTIVE,
      categoryId: apparel.id,
    },
    {
      sku: 'PRD-HOME-001',
      name: 'Minimalist Ceramic Desk Lamp',
      description: 'Warm LED illumination with touch dimmer and wireless charging base.',
      price: 49.99,
      stock: 5,
      status: ProductStatus.DRAFT,
      categoryId: homeLiving.id,
    },
    {
      sku: 'PRD-HOME-002',
      name: 'Smart Air Purifier Pro',
      description: 'HEPA H13 filter removes 99.97% of airborne particles with IoT monitoring.',
      price: 219.00,
      stock: 0,
      status: ProductStatus.ARCHIVED,
      categoryId: homeLiving.id,
    },
  ];

  for (const prod of sampleProducts) {
    await prisma.product.upsert({
      where: { sku: prod.sku },
      update: {},
      create: prod,
    });
  }
  console.log(`✅ Seeded ${sampleProducts.length} sample products`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
