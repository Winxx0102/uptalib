import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/user.module';
import { BooksModule } from './books/books.module';

@Module({
  imports: [
    PrismaModule, 
    AuthModule, 
    UsersModule, 
    BooksModule
  ],
})
export class AppModule {}
