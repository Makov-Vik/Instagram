import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from '../auth/auth.module';
import { PhotosController } from './photos.controller';
import { PhotosModule } from './photos.module';
import { PhotosService } from './photos.service';

describe('PhotosController', () => {
  let controller: PhotosController;
  const mockPhotoService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule, PhotosModule],
      controllers: [PhotosController],
      providers: [PhotosService],
    })
      .overrideProvider(PhotosService)
      .useValue(mockPhotoService)
      .compile();

    controller = module.get<PhotosController>(PhotosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
