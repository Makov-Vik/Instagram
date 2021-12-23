import { 
  Controller, Delete, Param, Post, Put, Body,
  Get, UseGuards 
} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import { PhotosStructure } from '../photos/photos.interface';
import { CommentService } from './comment.service';


@ApiTags('Comment')
@Controller('comment')
export class CommentController {

  constructor(private readonly service: CommentService) {}

  @ApiOperation({summary: "comment photo"})
  @ApiResponse({status: 200})
  @Post(':id/image/:idphoto')
  commentPhotosUser(@Param('idphoto') idphoto: number, @Param('id') iduser: number, @Body() fromBody: PhotosStructure, ) {
    return this.service.commentPhotosUser(iduser, idphoto, fromBody);
  }

}
