import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PhysicalBooksService } from './physical-books.service';
import { CreatePhysicalBookDto } from './dto/create-physical-book.dto';
import { UpdatePhysicalBookDto } from './dto/update-physical-book.dto';

@Controller('physical-book')
export class PhysicalBooksController {
  constructor(private readonly physicalBooksService: PhysicalBooksService) { }

  @Post()
  create(@Body() createPhysicalBookDto: CreatePhysicalBookDto) {
    return this.physicalBooksService.create(createPhysicalBookDto);
  }

  @Get()
  findAll(@Query() query) {
    return this.physicalBooksService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.physicalBooksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePhysicalBookDto: UpdatePhysicalBookDto) {
    return this.physicalBooksService.update(id, updatePhysicalBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.physicalBooksService.remove(id);
  }
}
