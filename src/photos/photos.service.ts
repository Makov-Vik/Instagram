import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult, getConnection}  from 'typeorm';
import { UsersEntity } from '../users/users.entity';
import { PhotosEntity } from '../photos/photos.entity';
import { PhotosStructure } from '../photos/photos.interface';
import { UploadFileStructure } from '../photos/uploadfile.interface';


@Injectable()
export class PhotosService {

  constructor(


    @InjectRepository(PhotosEntity)
    private readonly photosRepository: Repository<PhotosEntity>,

    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>
  )
  {}


  async uploadFile(iduser: number, file: UploadFileStructure, body): Promise<object> {

    try {
      const objImage: PhotosStructure = {
        iduser: iduser,
        url: file.filename,
      }

      const photo = await this.photosRepository.save(objImage);

      const result = {
        id: photo.id,
        originalname: file.originalname,
        filename: file.filename,
    };
    return result;

    } catch(err) {
      throw new Error(err);
    }
  }

  async seeUploadedFile(imageid: number, res) {
    try {
      const result = await this.photosRepository.find( {where: {id: imageid}} );
      return await res.sendFile(result[0].url, { root: './images' });

    } catch(err) {
      throw new Error(err);
    }
  }

  async deletePhoto(iduser: number, imageid: number): Promise<DeleteResult> {

    try {
      const result = await this.photosRepository.delete(imageid);
      return result;

    } catch(err) {
      throw new Error(err);
    }
  }

  async selectPhotosUser(idUser: number): Promise<object> {
    try {
      const photos = await this.photosRepository.find( {where: {iduser: idUser }} );
      return photos

    } catch (err){
      throw new Error(err);
    }
  }

}
