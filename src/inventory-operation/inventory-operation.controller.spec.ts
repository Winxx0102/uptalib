import { Test, TestingModule } from '@nestjs/testing';
import { InventoryOperationController } from './inventory-operation.controller';
import { InventoryOperationService } from './inventory-operation.service';

describe('InventoryOperationController', () => {
  let controller: InventoryOperationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InventoryOperationController],
      providers: [InventoryOperationService],
    }).compile();

    controller = module.get<InventoryOperationController>(InventoryOperationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
