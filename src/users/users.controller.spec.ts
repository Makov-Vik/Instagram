import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { PhotosEntity } from '../photos/photos.entity';
import { AuthModule } from '../auth/auth.module';
import { UsersController } from './users.controller';
import { UsersEntity } from './users.entity';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';

describe('UsersController', () => {
  let controller: UsersController;
  const mockUsersService = {};

  const mockUsersRepository = {};
  const mockPhotoRepository = {};
  const tokenUsers = getRepositoryToken(UsersEntity);
  const tokenPhoto = getRepositoryToken(PhotosEntity);
  let service: UsersService;
  let repo: Repository<UsersEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule, TypeOrmModule.forFeature([UsersService, UsersEntity, PhotosEntity])],
      
      controllers: [UsersController],
      providers: [UsersService, JwtService, 
        {
          provide: tokenUsers,
          useValue: mockUsersRepository
        },
        {
          provide: tokenPhoto,
          useValue: mockPhotoRepository
        }
      ],
    })

      .compile();

      service = module.get<UsersService>(UsersService);
      //repo = module.get(token);
    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
