import { Module } from '@nestjs/common';
import { PhysicalBookOperationService } from './physical-book-operation.service';
import { PhysicalBookOperationController } from './physical-book-operation.controller';

@Module({
  controllers: [PhysicalBookOperationController],
  providers: [PhysicalBookOperationService],
})
export class PhysicalBookOperationModule {}
