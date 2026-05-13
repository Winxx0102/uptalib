import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, HttpStatus, HttpCode } from '@nestjs/common';
import { PhysicalBookOperationService } from './physical-book-operation.service';
import { CreatePhysicalBookOperationDto } from './dto/create-physical-book-operation.dto';
import { UpdatePhysicalBookOperationDto } from './dto/update-physical-book-operation.dto';
import { MakeLoanDto } from './dto/makeLoan.dto';
import { EntrieDto } from './dto/entrie-dto';
import { DropDto } from './dto/drop-dto';
import { LoanDto } from './dto/loan-dto';

@Controller('physical-book-operation')
export class PhysicalBookOperationController {
  constructor(private readonly physicalBookOperationService: PhysicalBookOperationService) { }

  @Get()
  findAll(@Query() quer: any) {
    return this.physicalBookOperationService.findAllOperations(quer);
  }

  //entries
  @Patch('entries')
  addEntries(@Body() entriesDto: EntrieDto) {
    return this.physicalBookOperationService.addEntries(entriesDto)
  }

  @Patch('drops')
  addDrops(@Body() entriesDto: DropDto) {
    return this.physicalBookOperationService.addDrops(entriesDto)
  }


  //loan related
  @Post('loan')
  loan(@Body() makeLoanDto: LoanDto) {
    return this.physicalBookOperationService.loan(makeLoanDto);
  }

  @Patch('settle/:id')
  @HttpCode(HttpStatus.OK)
  settle(@Param('id') id) {
    console.log(id)
    return this.physicalBookOperationService.settle(id)
  }

  @Get('loan')
  findAllLoans(@Query() query: any) {
    return this.physicalBookOperationService.findAllLoans(query)

  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.physicalBookOperationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePhysicalBookOperationDto: UpdatePhysicalBookOperationDto) {
    return this.physicalBookOperationService.update(+id, updatePhysicalBookOperationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.physicalBookOperationService.remove(+id);
  }
}
