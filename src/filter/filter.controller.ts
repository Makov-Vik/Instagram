import { 
  Controller, Delete, Param, Post, Put, Body,
  Get, UseGuards, Query
} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import { FilterService } from './filter.service';

@Controller('filter')
export class FilterController {

  constructor(private readonly service: FilterService) {}

  @ApiOperation({summary: "filter photo"})
  @ApiResponse({status: 200})
  @Post()
  getHashtag(@Body() body) {
    return this.service.setFilter(body);
  }

}
