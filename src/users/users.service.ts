import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectConnection } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { DeleteResult, Repository, UpdateResult, Like, Connection  } from 'typeorm';
import { first, from, Observable } from 'rxjs';
import { createUserDto } from './dto/create-user.dto';
import { UsersStructure } from './users.interface';
import { updataUserDto } from './dto/update-user.dto';



@Injectable()
export class UsersService {
  constructor(

    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,

    )
  {}

  async createUser(user: createUserDto) {
    try {
      const result = await from(this.usersRepository.save(user)).toPromise()
      return result;
    } catch(err) {
      throw new Error(err);
    }
  }

  async getAllUsers(query): Promise<Array<object>> {

    try {
      const querydb = { where: {} };
      if (query.name) {
        querydb.where = { name: Like(`${query.name}%`) };
      }

      const resultdb = await from(this.usersRepository.find(querydb)).toPromise();

      return resultdb.reduce((prev: Array<object>, item: UsersEntity): Array<object> => {
        prev.push({
          id: item.id,
          name: item.name,
          email: item.email,
          description: item.description,
        });
        return prev;
      }, []);

    } catch (err) {
      throw new Error(err);
    }
  }

  async updataUser(id: number, user: updataUserDto): Promise<Observable<UpdateResult>> {
    try {
      const result = await from(this.usersRepository.update(id, user));
      return result;
      } catch (err) {
        throw new Error(err);
      }
  }

  async deleteUser(id: number): Promise<Observable<DeleteResult>> {
    try {
      const result = await from(this.usersRepository.delete(id));
      return result;
    } catch(err) {
      throw new Error(err);
    }
  }

  async getUserByEmail(email: string) {
    const user = await this.usersRepository.findOne( {where: {email: email}} );
    return user;
  }


}
