import { Injectable } from '@nestjs/common';

import { PrismaService } from 'prisma/prisma.service';
import { CreateItemInventory } from './dto/create-item-dto';
import { EditItemInventory } from './dto/edit-item-dto';


@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) { }
  async create(createInventoryDto: CreateItemInventory) {
    return { item: await this.prisma.item.create({ data: createInventoryDto }), message: 'Item añadido' };
  }

  async findAll(query: any) {


    const take = parseInt(query.limit) || 10;
    const search = query.search
    const where: any = {}
    if (search) {
      where.OR = [
        {
          name: { contains: search },
        },
        {
          description: { contains: search }
        }
      ]
    }


    return await this.prisma.item.findMany({ where, take })
  }

  findOne(id: number) {
    return `This action returns a #${id} inventorsyss`;
  }

  async edit(id: number, updateInventoryDto: EditItemInventory) {
    const item = await this.prisma.item.update({ where: { id: id }, data: updateInventoryDto })
    return { message: 'Item actualizasdo' }
  }

  async delete(id: number) {
    const item = await this.prisma.item.delete({ where: { id: id } })
    return { message: 'Item Eliminado' }
  }
}
