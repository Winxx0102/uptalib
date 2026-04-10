import { Test, TestingModule } from '@nestjs/testing';
import { PhysicalBooksController } from './physical-books.controller';
import { PhysicalBooksService } from './physical-books.service';

describe('PhysicalBooksController', () => {
  let controller: PhysicalBooksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhysicalBooksController],
      providers: [PhysicalBooksService],
    }).compile();

    controller = module.get<PhysicalBooksController>(PhysicalBooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
