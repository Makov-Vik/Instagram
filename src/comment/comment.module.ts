import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { CommentsEntity } from './comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from '../users/users.entity';
import { HashtagEntity } from 'src/hashtag/hashtag.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentsEntity, UsersEntity, HashtagEntity]),
  ],
  providers: [CommentService],
  controllers: [CommentController],
  exports: [CommentService],
})
export class CommentModule {}
