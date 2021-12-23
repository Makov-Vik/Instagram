import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
import { DeleteResult, Repository, UpdateResult, Like, Any  } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PhotosStructure } from '../photos/photos.interface';
import { CommentsEntity } from './comment.entity';
import { from } from 'rxjs';
import { CommentsStructure } from './comments.interface';
import { UsersEntity } from '../users/users.entity';
import { HashtagEntity } from '../hashtag/hashtag.entity';
require('dotenv').config();
dotenv.config();

interface Email {
  [key: string]: any;
}
  
const configurate: Email = {
  host: process.env.HOST,
  port: process.env.PORT,
  auth: {
    user: process.env.AUTHUSER,
    pass: process.env.AUTHPASS,
  }
}
const transporter: Email = nodemailer.createTransport(configurate);


@Injectable()
export class CommentService {

  constructor(
    @InjectRepository(CommentsEntity)
    private readonly commentsRepository: Repository<CommentsEntity>,

    @InjectRepository(UsersEntity)
    private readonly UsersRepository: Repository<UsersEntity>,

    @InjectRepository(HashtagEntity)
    private readonly HashtagRepository: Repository<HashtagEntity>,

    )
  {}

    private async sendMessage(toUser: string, text: string): Promise<void> {

      await transporter.sendMail({
        from: `"Fred Foo 👻" <${process.env.AUTHUSER}>`,
        to: `${toUser}`,
        subject: "New comment",
        text: text,
      }, (err: Error, info: any) => {
        if (err) console.log(err);
      });
    }

  async commentPhotosUser(idUser: number, idPhoto: number, fromBody) {
    try {
      const objectComment: CommentsStructure = {
        iduser: idUser,
        idphoto: idPhoto,
        comment: fromBody.comment
      }
      const result: object = await from(this.commentsRepository.save(objectComment)).toPromise()
      
      // work with notify user
      const arrayCommentUsers: Array<string> = fromBody.comment.split('@').map((i) => { return i.split(' ')[0]}).splice(1);
      const users: Array<UsersEntity> = await from(this.UsersRepository.find( {where: [{id: idUser}, {name: Any(arrayCommentUsers)}] } )).toPromise()
      const ownerPhoto: Array<UsersEntity> = users.filter((item) => idUser == item.id );
      const notifyUsers: Array<UsersEntity> = users.filter((item) => item.id != idUser );

      this.sendMessage(ownerPhoto[0].email, 'New comment on your photo');
      notifyUsers.forEach((item) => {
        this.sendMessage(item.email, `You were mentioned in the comment in photo of ${ownerPhoto[0].name}`);
      })


      //work with hashtag
      const arrayHashtag: Array<string> = fromBody.comment.split('#').map((i) => { return i.split(' ')[0]}).splice(1);
      arrayHashtag.forEach(async (item) => {
        await from(this.HashtagRepository.save({ name: item}));
      })
     
      return result;

    } catch (err){
        throw new Error(err);
      }
  }
  

}
