import { IsString, IsNotEmpty, IsOptional, IsNumber, IsInt, Min, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { ProductStatus } from '@prisma/client';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  price: number;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsOptional()
  stock?: number;

  @IsEnum(ProductStatus)
  @IsOptional()
  status?: ProductStatus;

  @Type(() => Number)
  @IsInt()
  categoryId: number;
}
