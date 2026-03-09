import { Injectable } from '@nestjs/common';
// eslint-disable-next-line prettier/prettier
  import { PrismaService } from '../prisma.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateInventoryDto) {
    return this.prisma.inventory.create({
      data: data,
    });
  }

  findAll() {
    return this.prisma.inventory.findMany({
      include: {
        product: true,
        location: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.inventory.findUnique({
      where: { id },
      include: {
        product: true,
        location: true,
      },
    });
  }

  update(id: string, data: UpdateInventoryDto) {
    return this.prisma.inventory.update({
      where: { id },
      data: data,
    });
  }

  remove(id: string) {
    return this.prisma.inventory.delete({
      where: { id },
    });
  }
}
