import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersEntity } from './users.entity';
import { PhotosEntity } from '../photos/photos.entity';
import { AuthModule } from '../auth/auth.module';
import { PhotosService } from '../photos/photos.service'
//import { config } from '../orm.config';

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  username: 'postgres',
  password: 'root',
  port: 5432,
  host: '127.0.0.1',
  database: 'finalwork',
  synchronize: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
}

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity, PhotosEntity]),
  forwardRef( () => AuthModule)],

  providers: [UsersService, PhotosService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}
