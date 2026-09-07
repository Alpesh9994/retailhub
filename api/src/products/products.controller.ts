import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // GET /products — list with optional search, status, and category filters
  @Get()
  findAll(@Query() query: ProductQueryDto) {
    return this.productsService.findAll(query);
  }

  // GET /products/categories — list all categories for filter dropdowns
  // (Defined BEFORE :id so "categories" is not parsed as a numeric ID)
  @Get('categories')
  getCategories() {
    return this.productsService.getCategories();
  }

  // GET /products/:id — single product details
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findById(id);
  }

  // POST /products — create new product
  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  // PATCH /products/:id — update existing product
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProductDto,
  ) {
    return this.productsService.update(id, dto);
  }

  // DELETE /products/:id — remove product
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.delete(id);
  }
}
