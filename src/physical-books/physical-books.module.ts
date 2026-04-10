import { Module } from '@nestjs/common';
import { PhysicalBooksService } from './physical-books.service';
import { PhysicalBooksController } from './physical-books.controller';

@Module({
  controllers: [PhysicalBooksController],
  providers: [PhysicalBooksService],
})
export class PhysicalBooksModule {}
