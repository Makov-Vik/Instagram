import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from } from 'rxjs';
import { Repository, Like } from 'typeorm';
import { HashtagEntity } from './hashtag.entity';

@Injectable()
export class HashtagService {
  
  constructor(
    @InjectRepository(HashtagEntity)
    private readonly HashtagRepository: Repository<HashtagEntity>,

    )
  {}

  async getHashtag(nameHashtag: string, query) {
    try {
      const querydb = { where: {} };
      if (query.name) {
        querydb.where = { name: Like(`${query.name}%`) };
      }

      const resultdb = await from(this.HashtagRepository.find(querydb)).toPromise();

      return resultdb.reduce((prev: Array<object>, item: HashtagEntity): Array<object> => {
        prev.push({
          id: item.id,
          name: item.name,
          description: item.description,
        });
        return prev;
      }, []);

    } catch (err) {
      throw new Error(err);
    }
  
  }
}
