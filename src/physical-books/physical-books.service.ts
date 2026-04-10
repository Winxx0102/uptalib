import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePhysicalBookDto } from './dto/create-physical-book.dto';
import { UpdatePhysicalBookDto } from './dto/update-physical-book.dto';
import { PrismaService } from 'prisma/prisma.service';
import { CreateBookDto } from '@/books/dto/create-book.dto';

@Injectable()
export class PhysicalBooksService {
  constructor(private prisma: PrismaService) { }
  async create(createPhysicalBookDto: CreatePhysicalBookDto) {
    return this.prisma.$transaction(async (tx) => {

      const physicalBook = await tx.physicalBook.create({
        data: { ...createPhysicalBookDto, availableStock: createPhysicalBookDto.totalStock }
      })

      return {
        status: 'success',
        message: 'Libro físico creados exitosamente',
        data: { ...physicalBook }
      };
    });
  }

  findAll() {
    return `This action returns all physicalBooks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} physicalBook`;
  }

  update(id: string, updatePhysicalBookDto: UpdatePhysicalBookDto) {
    return this.prisma.$transaction(async (tx) => {

      const physicalBook = await tx.physicalBook.update({
        where: { id: id },
        data: updatePhysicalBookDto
      })

      return {
        status: 'success',
        message: 'Libro físico actualizado exitosamente',
        data: { ...physicalBook }
      };
    });

  }

  async remove(id: string) {
    const removedBook = await this.prisma.physicalBook.delete({
      where: { id }
    })
    return { status: 'success', message: 'Libro fisico eliminado' };
  }
}
