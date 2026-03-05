import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Injectable()
export class LocationsService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateLocationDto) {
    return this.prisma.location.create({
      data: data,
    });
  }

  findAll() {
    return this.prisma.location.findMany();
  }

  findOne(id: string) {
    return this.prisma.location.findUnique({
      where: { id },
    });
  }

  update(id: string, data: UpdateLocationDto) {
    return this.prisma.location.update({
      where: { id },
      data: data,
    });
  }

  remove(id: string) {
    return this.prisma.location.delete({
      where: { id },
    });
  }
}
