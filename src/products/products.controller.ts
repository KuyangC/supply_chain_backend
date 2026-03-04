import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('products')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  @Roles('ADMIN', 'MANAGER')
  create(@Body() CreateProductDto: CreateProductDto) {
    return this.productService.create(CreateProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }
  @Patch(':id')
  @Roles('ADMIN', 'MANAGER', 'OPERATOR')
  update(@Param('id') id: string, @Body() UpdateProductDto: UpdateProductDto) {
    return this.productService.update(id, UpdateProductDto);
  }

  @Delete(':id')
  @Roles('ADMIN', 'MANAGER')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
