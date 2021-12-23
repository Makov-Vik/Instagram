import { 
  Controller, Delete, Param, Post, Put, Body,
  Get, UseGuards, Query
} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import { HashtagService } from './hashtag.service';

@ApiTags('Hashtag')
@Controller('hashtag')
export class HashtagController {

  constructor(private readonly service: HashtagService) {}

  @ApiOperation({summary: "hashtag photo"})
  @ApiResponse({status: 200})
  @Get()
  getHashtag(@Param('name') name: string, @Query() query) {
    return this.service.getHashtag(name, query);
  }



}
