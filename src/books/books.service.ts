import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

interface book {
  title: string; description?: string; routepdf: string; routeimg?: string
}
interface bookUpdate {
  title?: string; description?: string; routepdf?: string; routeimg?: string
}
@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) { }


  async findOne(id: number) {
    const book = await this.prisma.book.findUnique({ where: { id } })
    return book
  }

  async findAll(query: any) {
    const take = parseInt(query.limit) || 10;
    const search = query.search

    const where: any = {}

    if (search) {
      where.OR = [
        {
          title: { contains: search },
        },
        {
          description: { contains: search }
        }
      ]
    }

    return this.prisma.book.findMany({
      take,
      where,
    })


  }
  async create(data: any) {
    const book = await this.prisma.book.create({ data })
    return { message: 'Libro Creado' };
  }

  async delete(id: number) {
    return { book: await this.prisma.book.delete({ where: { id } }), message: 'Libro Eliminado' }
  }

  async edit(id: number, data: bookUpdate) {

    return { book: await this.prisma.book.update({ where: { id }, data: data }), message: 'Libro editado' }
  }

  async saveToUser(userId: number, bookId: number) {
    // Verificamos si el libro existe
    const book = await this.prisma.book.findUnique({ where: { id: bookId } });
    if (!book) throw new NotFoundException('El libro no existe');

    try {
      return await this.prisma.savedBook.create({
        data: {
          userId,
          bookId,
        },
      });
    } catch (error) {
      // P2002 es el código de Prisma para violación de restricción única
      throw new ConflictException('Ya tienes este libro guardado');
    }
  }

  async getSavedBook(userId: number) {
    const userLibrary = await this.prisma.savedBook.findMany({
      where: { userId },
      include: {
        book: true, // Asegúrate que en el schema diga 'book' y no 'books'
      },
    });

    return userLibrary.map((item) => item.book);
  }
}