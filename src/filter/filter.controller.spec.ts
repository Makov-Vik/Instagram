import { Test, TestingModule } from '@nestjs/testing';
import { FilterController } from './filter.controller';
import { FilterService } from './filter.service';

describe('FilterController', () => {
  let controller: FilterController;
  const mockFilterService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilterController],
      providers: [FilterService],
    })
      .overrideProvider(FilterService)
      .useValue(mockFilterService)
    .compile();

    controller = module.get<FilterController>(FilterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
