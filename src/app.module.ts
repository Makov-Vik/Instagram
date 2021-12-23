import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
//import { config } from './orm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotosModule } from './photos/photos.module';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';
import { HashtagModule } from './hashtag/hashtag.module';
import { FilterModule } from './filter/filter.module';
import { CommentsEntity } from './comment/comment.entity';

import * as dotenv from 'dotenv';
require('dotenv').config();
dotenv.config();

console.log(process.env.DB_USERNAME);
@Module({
  imports: [
    UsersModule,
    PhotosModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT),
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      synchronize: true,
      entities: ['dist/**/*.entity{.ts,.js}'],
    }),
    MulterModule.register({
      dest: './images',
    }),
    AuthModule,
    CommentModule,
    HashtagModule,
    FilterModule,
    TypeOrmModule.forFeature([CommentsEntity]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
