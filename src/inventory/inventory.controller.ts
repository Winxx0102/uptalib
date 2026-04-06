import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateItemInventory } from './dto/create-item-dto';
import { EditItemInventory } from './dto/edit-item-dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { storageFor1File } from '@/books/utils/storage';
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) { }



  @Post()
  @UseInterceptors(FileInterceptor('img', storageFor1File))
  create(@Body() createInventoryDto: any, @UploadedFile() img: Express.Multer.File) {

    createInventoryDto.stock = parseInt(createInventoryDto.stock)
    if (img) {
      const imgPath = `/public/uploads/img/${img.filename}`;
      return this.inventoryService.create({ ...createInventoryDto, routeimg: imgPath });
    }
    return this.inventoryService.create(createInventoryDto);

  }

  @Get()
  findAll(@Query() query: any) {
    return this.inventoryService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.inventoryService.findOne(+id);
  }

  @Patch(':id')
  edit(@Param('id') id: number, @Body() updateInventoryDto: EditItemInventory) {
    return this.inventoryService.edit(+id, updateInventoryDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.inventoryService.delete(+id);
  }
}
