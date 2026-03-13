import { Injectable } from '@nestjs/common';
import { CreateUserInventoryDto } from './dto/create-user-inventory.dto';
import { CreateUserDto } from '../user/dto/user.dto';
import { PrismaService } from 'prisma/prisma.service';



@Injectable()
export class UserInventoryService {


constructor(private prisma: PrismaService) {}

  async create(createUserInventoryDto: CreateUserInventoryDto) {
    return await this.prisma.userInventory.create({
      data: {
        name: createUserInventoryDto.name,
        lastname: createUserInventoryDto.lastname,
        cedula: createUserInventoryDto.cedula,
      },
    }); 
  }

  async findAll() {
    return await this.prisma.userInventory.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.userInventory.findUnique({
      where: {
        id,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.userInventory.delete({
      where: {
        id,
      },
    });
  }
  }

