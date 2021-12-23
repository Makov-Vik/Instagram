import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CommentsEntity } from './comment.entity';
import { CommentService } from './comment.service';

describe('CommentService', () => {
  let service: CommentService;
  const mockCommentService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentService, , {
        provide: getRepositoryToken(CommentsEntity),
        useValue: mockCommentService
      }],
    }).compile();

    service = module.get<CommentService>(CommentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
