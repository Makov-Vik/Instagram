import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilterController } from './filter.controller';
import { FilterEntity } from './filter.entity';
import { FilterService } from './filter.service';

@Module({
  imports: [TypeOrmModule.forFeature([FilterEntity])],
  providers: [FilterService],
  controllers: [FilterController],
  exports: [FilterService],
})
export class FilterModule {}
