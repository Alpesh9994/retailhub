import { IsOptional, IsString, IsEnum } from 'class-validator';
import { ProductStatus } from '@prisma/client';

export class ProductQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(ProductStatus)
  status?: ProductStatus;

  @IsOptional()
  @IsString()
  category?: string;
}
