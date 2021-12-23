import {Body, Controller, Post} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import { createUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';


@ApiTags('authorization')
@Controller('auth')
export class AuthController {

    constructor(private service: AuthService) {}

    @Post('/login')
    login(@Body() user: createUserDto) {
        return this.service.login(user)
    }

    @Post('registration')
    registration(@Body() user: createUserDto) {
        return this.service.registration(user)
    }
}