import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.book.findMany();
  }

  async create(data: { title: string; description?: string; routepdf: string; routeimg?: string }) {
    return this.prisma.book.create({ data });
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