import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateItemInventory } from './dto/create-item-dto';
import { EditItemInventory } from './dto/edit-item-dto';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) { }

  @Post()
  create(@Body() createInventoryDto: CreateItemInventory) {
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
