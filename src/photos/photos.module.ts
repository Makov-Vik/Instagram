import { Module } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { PhotosController } from './photos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotosEntity } from '../photos/photos.entity';
import { UsersEntity } from '../users/users.entity';
import { AuthModule } from '../auth/auth.module';
//import { config } from '../orm.config';

@Module({
  imports: [TypeOrmModule.forFeature([PhotosEntity, UsersEntity]), AuthModule],
  providers: [PhotosService],
  controllers: [PhotosController],
  exports: [PhotosService],
})
export class PhotosModule {}
