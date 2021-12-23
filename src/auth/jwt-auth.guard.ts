import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtAuthGuard implements CanActivate {

  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest()
    try {
      const uathHeader = req.headers.authorization;
      const bearer = uathHeader.split(' ')[0];
      const token = uathHeader.split(' ')[1];

      if(bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException( {message: 'User is not logged in'} )
      }

      const user = this.jwtService.verify(token);
      req.user = user;
      return true

    } catch (e) {
      throw new UnauthorizedException( {message: 'User is not logged in'} )
    }
  }
}