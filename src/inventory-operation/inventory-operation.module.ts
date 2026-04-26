import { Module } from '@nestjs/common';
import { InventoryOperationService } from './inventory-operation.service';
import { InventoryOperationController } from './inventory-operation.controller';

@Module({
  controllers: [InventoryOperationController],
  providers: [InventoryOperationService],
})
export class InventoryOperationModule {}
