import { 
  Controller, Delete, Param, Post, Put, Body,
  Get, Query, UseGuards 
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { createUserDto } from './dto/create-user.dto';
import { UsersStructure } from './users.interface';
import { UsersService } from './users.service';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import { UsersEntity } from './users.entity';
import { updataUserDto } from './dto/update-user.dto';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {

  constructor(private readonly service: UsersService) {}

  @ApiOperation({summary: "creating user"})
  @ApiResponse({status: 201, type: UsersEntity})
  @Post()
  createUser(@Body() user: createUserDto): Promise<UsersStructure> {
    return this.service.createUser(user);
  }

  @ApiOperation({summary: "get all users"})
  @ApiResponse({status: 200, type: [UsersEntity]})
  @UseGuards(JwtAuthGuard)
  @Get()
  getAllUsers(@Query() query): Promise<Array<object>> {
    return this.service.getAllUsers(query);
  }

  @ApiOperation({summary: "delete user"})
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteUser(@Param('id') id: number): Promise<Observable<DeleteResult>> {
    return this.service.deleteUser(id);
  }

  @ApiOperation({summary: "update user"})
  @ApiResponse({status: 200, type: [UsersEntity]})
  @Put(':id')
  updataUser(@Body() updataUser: updataUserDto, @Param('id') id: number): Promise<Observable<UpdateResult>> {
    return this.service.updataUser(id, updataUser);
  }

}
