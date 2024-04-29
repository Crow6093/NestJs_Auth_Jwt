import { CanActivate, ExecutionContext, HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { jwtConstants } from '../constants/jwt.constant';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
async canActivate(context: ExecutionContext,): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token){
      throw new  UnauthorizedException('request not authorized') 
    }
    try{
      const payload = await this.jwtService.verifyAsync(token,{secret: jwtConstants.secret});
      request['user'] = payload;
    }catch{
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }


  private extractTokenFromHeader(request: Request): string | undefined {
    const [token] = request.headers.authorization?.split(' ') ?? [];
    console.log(token);
    return  token ;
  }
}

