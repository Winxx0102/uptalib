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
import { existsSync , unlinkSync} from 'fs';
import { join } from 'path';
@Controller('book')
export class BookController {
  constructor(private bookService: BookService) { }

  @Get() // Todos los logueados ven
  @UseGuards(JwtAuthGuard)
  // @UseInterceptors(PrismaPaginationInterceptor)
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
  @UseInterceptors(FileInterceptor( 'pdf',{
    limits: {
      files: 1, 
    },
    
    storage: diskStorage({
      destination: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
          cb(null, './public/uploads/img');
        } else if (file.mimetype.includes('pdf')) {
          cb(null, './public/uploads/pdf');
        } else {
          cb(new Error('Tipo no permitido'), null);
        }
      },
      filename: (req, file, cb) => {
        const name = req.body.title || 'sin-nombre';
        const uniqueSuffix = randomUUID(); // UUID v4

        cb(null, `${name}-${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
  }))


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
@UseInterceptors(FileFieldsInterceptor([
  { name: 'pdf', maxCount: 1 },
  { name: 'img', maxCount: 1 }
], {
  limits: {
    files: 2,
  },
  storage: diskStorage({
    destination: (req, file, cb) => {
      if (file.mimetype.startsWith('image/')) {
        cb(null, './public/uploads/img');
      } else if (file.mimetype.includes('pdf')) {
        cb(null, './public/uploads/pdf');
      } else {
        cb(new Error('Tipo no permitido'), null);
      }
    },
    filename: (req, file, cb) => {
      const name = req.body.title || 'sin-nombre';
      const uniqueSuffix = randomUUID();
      cb(null, `${name}-${uniqueSuffix}${extname(file.originalname)}`);
    },
  }),
}))
async edit(
  @Param('id', ParseIntPipe) id: number,
  @Body() data: UpdateBookDto,
  @UploadedFile('pdf') pdfFile: Express.Multer.File,
  @UploadedFile('img') imgFile: Express.Multer.File,
) {
  // Obtener el libro existente para eliminar archivos antiguos
  const existingBook = await this.bookService.findOne(id);
  
  if (!existingBook) {
    throw new NotFoundException('El libro no existe');
  }

  // Eliminar archivos antiguos si existen
  const filePaths = [existingBook.routepdf, existingBook.routeimg];
  filePaths.forEach((path) => {
    if (path) {
      const fullPath = join(process.cwd(), path);
      if (existsSync(fullPath)) {
        unlinkSync(fullPath);
      }
    }
  });

  // Preparar datos para actualizar
  const updateData: any = { ...data };
  
  // Agregar nuevas rutas de archivos si se subieron
  if (pdfFile) {
    updateData.routepdf = `/public/uploads/pdf/${pdfFile.filename}`;
  }
  
  if (imgFile) {
    updateData.routeimg = `/public/uploads/img/${imgFile.filename}`;
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