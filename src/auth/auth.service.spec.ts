import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersEntity } from '../users/users.entity';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  const mockUsersRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, JwtService, {
        provide: getRepositoryToken(UsersEntity),
        useValue: mockUsersRepository
      }]
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
