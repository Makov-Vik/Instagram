import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from } from 'rxjs';
import { Repository } from 'typeorm';
import { FilterEntity } from './filter.entity';

@Injectable()
export class FilterService {

  constructor(
    @InjectRepository(FilterEntity)
    private readonly filterRepository: Repository <FilterEntity>,
    )
  {}

  async setFilter(body): Promise<object> {

    try {
      const result = await from(this.filterRepository.save(body));
      return result; 
    } catch(e) {
      console.log(e);
    }

  }
}
