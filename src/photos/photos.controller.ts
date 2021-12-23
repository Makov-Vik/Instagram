import { 
  Controller, Delete, Param, Post, Put, Body,
  Get, Query, UseInterceptors, UploadedFile, Res, UseGuards 
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from './utils/images-upload.utils';
import { UploadFileDto } from '../photos/dto/upload-file.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PhotosService } from './photos.service';
import { PhotosStructure } from './photos.interface';

@ApiTags('Photos')
@Controller('photos')
export class PhotosController {

  constructor(private readonly service: PhotosService) {}

  @ApiOperation({summary: "upload photo"})
  @ApiResponse({status: 200})
  @Post(':id/image')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './images',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  uploadFile(@UploadedFile() file: UploadFileDto, @Param('id') iduser: number, @Body() body): Promise<object> {
    return this.service.uploadFile(iduser, file, body)
  }

  @ApiOperation({summary: "see photo"})
  @ApiResponse({status: 200})
  @Get(':id/image/:imgid')
  seeUploadedFile(@Param('imgid') imageid: number, @Res() res) {
    return this.service.seeUploadedFile(imageid, res);
  }

  @ApiOperation({summary: "delete photo"})
  @Delete(':id/image/:imgid')
  @UseGuards(JwtAuthGuard)
  deletePhoto(@Param('imgid') imageid: number, @Param('id') iduser: number): Promise<DeleteResult> {
    return this.service.deletePhoto(iduser, imageid);
  }

  @ApiOperation({summary: "select photos of user"})
  @ApiResponse({status: 200})
  @Get(':id/image')
  selectPhotosUser(@Param('id') iduser: number): Promise<object> {
    return this.service.selectPhotosUser(iduser);
  }

}
