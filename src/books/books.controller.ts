import { Controller, Get, Post, Body, UseGuards, NotFoundException, Req, Param, ParseIntPipe, Delete, Patch, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { BookService } from './books.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; // Crea un guard sencillo que use AuthGuard('jwt')
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { randomUUID, UUID } from 'crypto';
import { existsSync, unlinkSync } from 'fs';
import { join } from 'path';
import { storageFor1File } from './utils/storage';
@Controller('book')
export class BookController {
  constructor(private bookService: BookService) { }

  @Get() // Todos los logueados ven
  @UseGuards(JwtAuthGuard)
  findAll(@Query() query: any) {
    return this.bookService.findAll(query);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.bookService.findOne(id);
  }



  @Post() // Solo ADMIN sube libros
  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('pdf', storageFor1File))


  create(@Body() data: any, @UploadedFile() file: Express.Multer.File) {
    const filePath = `/public/uploads/pdf/${file.filename}`;
    return this.bookService.create({ ...data, routepdf: filePath });
  }




  //accept=".pdf"

  @Delete(':id')
  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async delete(@Param('id', ParseIntPipe) id: number) {

    const book = await this.bookService.findOne(id);

    if (!book) {
      throw new NotFoundException('El libro no existe');
    }


    const filePaths = [book.routepdf, book.routeimg];

    filePaths.forEach((path) => {
      if (path) {

        const fullPath = join(process.cwd(), path);

        if (existsSync(fullPath)) {
          unlinkSync(fullPath);
        }
      }
    });

    return this.bookService.delete(id);
  }


  @Patch(':id') // Solo ADMIN actualiza
  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('pdf', storageFor1File))
  async edit(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: any,
    @UploadedFile() pdfFile: Express.Multer.File,

  ) {
    // Obtener el libro existente para eliminar archivos antiguos
    const existingBook = await this.bookService.findOne(id);

    if (!existingBook) {
      throw new NotFoundException('El libro no existe');
    }

    // Preparar datos para actualizar
    let updateData: any = data;

    if (pdfFile) {
      // Eliminar archivos antiguos si existen
      const filePaths = [existingBook.routepdf];
      filePaths.forEach((path) => {
        if (path) {
          const fullPath = join(process.cwd(), path);
          if (existsSync(fullPath)) {
            unlinkSync(fullPath);
          }
        }
      });
      updateData = { ...data, routepdf: `/public/uploads/pdf/${pdfFile.filename}` };
    }

    return this.bookService.edit(id, updateData);
  }





  @Post('save/:bookId') // El usuario guarda un libro en su lista
  @UseGuards(JwtAuthGuard)
  save(@Req() req, @Param('bookId', ParseIntPipe) bookId: number) {
    return this.bookService.saveToUser(req.user.userId, bookId);
  }

  @Get('my-library') // Ver mis libros guardados
  @UseGuards(JwtAuthGuard)
  getMyLibrary(@Req() req) {
    return this.bookService.getSavedBook(req.user.userId);
  }
}