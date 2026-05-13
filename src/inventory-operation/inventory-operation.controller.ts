import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { InventoryOperationService } from './inventory-operation.service';
import { CreateInventoryOperationDto } from './dto/create-inventory-operation.dto';
import { UpdateInventoryOperationDto } from './dto/update-inventory-operation.dto';
import { EntrieDto } from './dto/entrie-dto';
import { DropDto } from './dto/drop-dto';
import { LoanDto } from './dto/loan-dto';

@Controller('inventory-operation')
export class InventoryOperationController {
  constructor(private readonly inventoryOperationService: InventoryOperationService) { }

  //entries
  @Patch('entries')
  addEntries(@Body() entriesDto: EntrieDto) {
    return this.inventoryOperationService.addEntries(entriesDto)
  }

  @Patch('drops')
  addDrops(@Body() entriesDto: DropDto) {
    return this.inventoryOperationService.addDrops(entriesDto)
  }



  @Get('loan')
  findAllLoans(@Query() query: any) {
    return this.inventoryOperationService.findAllLoans(query)
  }

  @Post('loan')
  loan(@Body() itemLoan: LoanDto) {
    return this.inventoryOperationService.loan(itemLoan)
  }

  @Patch('settle/:id')
  settle(@Param('id') id: string) {
    return this.inventoryOperationService.settle(id)
  }

  @Post()
  create(@Body() createInventoryOperationDto: CreateInventoryOperationDto) {
    return this.inventoryOperationService.create(createInventoryOperationDto);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.inventoryOperationService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inventoryOperationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInventoryOperationDto: UpdateInventoryOperationDto) {
    return this.inventoryOperationService.update(+id, updateInventoryOperationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inventoryOperationService.remove(+id);
  }
}
