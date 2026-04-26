import { Test, TestingModule } from '@nestjs/testing';
import { InventoryOperationService } from './inventory-operation.service';

describe('InventoryOperationService', () => {
  let service: InventoryOperationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InventoryOperationService],
    }).compile();

    service = module.get<InventoryOperationService>(InventoryOperationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
