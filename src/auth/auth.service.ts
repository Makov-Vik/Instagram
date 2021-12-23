import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { createUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {

  constructor(private usersService: UsersService,
    private jwtService: JwtService){

  }

  async login(userDto: createUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }


  async registration(user: createUserDto) {
    const applicant = await this.usersService.getUserByEmail(user.email);
    if (applicant) {
      throw new HttpException('user with this email already exist', HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await bcrypt.hash(user.password, 5);
    const newUser = await this.usersService.createUser( {...user, password: hashPassword} );

    return this.generateToken(newUser);
  }

  private async generateToken(user) {
    const payload = { id: user.id, name: user.name, email: user.email }
    return {
      token: this.jwtService.sign(payload)
    }
  }

  private async validateUser(userDto: createUserDto) {
    const user = await this.usersService.getUserByEmail(userDto.email);
    if (!user) {
      throw new UnauthorizedException( {massage: "Wrong email or password"} );
    }
    const equalPassword = await bcrypt.compare(userDto.password, user.password);

    if (equalPassword) {
      return user;
    }
    else {
      throw new UnauthorizedException( {massage: "Wrong email or password"} );
    }
  }
  
}
