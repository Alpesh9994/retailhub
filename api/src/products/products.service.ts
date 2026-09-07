import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query?: ProductQueryDto) {
    const where: Prisma.ProductWhereInput = {};

    if (query?.status) {
      where.status = query.status;
    }

    if (query?.category) {
      where.category = {
        slug: query.category,
      };
    }

    if (query?.search) {
      where.OR = [
        { name: { contains: query.search, mode: 'insensitive' } },
        { sku: { contains: query.search, mode: 'insensitive' } },
        { description: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    return this.prisma.product.findMany({
      where,
      include: {
        category: {
          select: { id: true, name: true, slug: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        category: {
          select: { id: true, name: true, slug: true },
        },
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async create(dto: CreateProductDto) {
    // Check if category exists
    const category = await this.prisma.category.findUnique({
      where: { id: dto.categoryId },
    });
    if (!category) {
      throw new BadRequestException(`Category with ID ${dto.categoryId} does not exist`);
    }

    // Check SKU uniqueness
    const existingSku = await this.prisma.product.findUnique({
      where: { sku: dto.sku },
    });
    if (existingSku) {
      throw new ConflictException(`Product with SKU "${dto.sku}" already exists`);
    }

    return this.prisma.product.create({
      data: {
        sku: dto.sku,
        name: dto.name,
        description: dto.description,
        price: dto.price,
        stock: dto.stock ?? 0,
        status: dto.status,
        categoryId: dto.categoryId,
      },
      include: {
        category: {
          select: { id: true, name: true, slug: true },
        },
      },
    });
  }

  async update(id: number, dto: UpdateProductDto) {
    await this.findById(id); // Throws NotFoundException if missing

    if (dto.categoryId) {
      const category = await this.prisma.category.findUnique({
        where: { id: dto.categoryId },
      });
      if (!category) {
        throw new BadRequestException(`Category with ID ${dto.categoryId} does not exist`);
      }
    }

    return this.prisma.product.update({
      where: { id },
      data: dto,
      include: {
        category: {
          select: { id: true, name: true, slug: true },
        },
      },
    });
  }

  async delete(id: number) {
    await this.findById(id); // Throws NotFoundException if missing

    await this.prisma.product.delete({
      where: { id },
    });

    return { message: `Product #${id} successfully deleted` };
  }

  async getCategories() {
    return this.prisma.category.findMany({
      include: {
        _count: {
          select: { products: true },
        },
      },
      orderBy: { name: 'asc' },
    });
  }
}
