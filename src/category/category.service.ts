import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) { }
  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.prisma.category.create({ data: { name: createCategoryDto.name } })
    return { status: 'success', message: 'Categoria creada', data: category };
  }

  findAll() {
    return `This action returns all category`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.prisma.category.update({
      where: { id: id.toString() }, data: {
        name: updateCategoryDto.name
      }
    })
    return { status: 'success', message: `Se ha actualizado a ${updateCategoryDto.name}` };
  }

  async remove(id: number) {
    const category = await this.prisma.category.delete({
      where: { id: id.toString() }
    })
    return { status: 'success', message: 'Se ha eliminado la categoria' };
  }
}
