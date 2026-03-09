import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { UpdateShipmentDto } from './dto/update-shipment.dto';

@Injectable()
export class ShipmentService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateShipmentDto) {
    return this.prisma.shipment.create({
      data: data,
      include: {
        fromLocation: true,
        toLocation: true,
        user: true,
        items: true,
      },
    });
  }

  findAll() {
    return this.prisma.shipment.findMany({
      include: {
        fromLocation: true,
        toLocation: true,
        user: true,
        items: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.shipment.findUnique({
      where: { id },
      include: {
        fromLocation: true,
        toLocation: true,
        user: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  update(id: string, data: UpdateShipmentDto) {
    return this.prisma.shipment.update({
      where: { id },
      data: data,
    });
  }

  remove(id: string) {
    return this.prisma.shipment.delete({
      where: { id },
    });
  }
}
