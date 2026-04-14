import { Test, TestingModule } from '@nestjs/testing';
import { PhysicalBookOperationService } from './physical-book-operation.service';

describe('PhysicalBookOperationService', () => {
  let service: PhysicalBookOperationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhysicalBookOperationService],
    }).compile();

    service = module.get<PhysicalBookOperationService>(PhysicalBookOperationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
