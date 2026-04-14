import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, HttpStatus, HttpCode } from '@nestjs/common';
import { PhysicalBookOperationService } from './physical-book-operation.service';
import { CreatePhysicalBookOperationDto } from './dto/create-physical-book-operation.dto';
import { UpdatePhysicalBookOperationDto } from './dto/update-physical-book-operation.dto';
import { MakeLoanDto } from './dto/makeLoan.dto';

@Controller('physical-book-operation')
export class PhysicalBookOperationController {
  constructor(private readonly physicalBookOperationService: PhysicalBookOperationService) { }

  @Post('loan')
  loan(@Body() makeLoanDto: MakeLoanDto) {
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

  @Get()
  findAll() {
    return this.physicalBookOperationService.findAll();
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
