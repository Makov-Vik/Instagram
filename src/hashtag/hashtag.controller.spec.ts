import { Test, TestingModule } from '@nestjs/testing';
import { HashtagController } from './hashtag.controller';
import { HashtagService } from './hashtag.service';

describe('HashtagController', () => {
  let controller: HashtagController;
  const mockHashtagService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HashtagController],
      providers: [HashtagService],
    })
      .overrideProvider(HashtagService)
      .useValue(mockHashtagService)
      .compile();

    controller = module.get<HashtagController>(HashtagController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
