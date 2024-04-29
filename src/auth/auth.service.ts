import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SingUpDto } from './dto/singUp.dto';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { emit } from 'process';


@Injectable()
export class AuthService {

  constructor(private readonly userService: UserService,
    private readonly JwtService: JwtService,
  ) {}

async singUp(singUpDto:SingUpDto){
  const user = await this.userService.findOneByEmail(singUpDto.email);

  if(user){
    return new BadRequestException('Email already in use');
  }

  singUpDto.password = await bcryptjs.hash(singUpDto.password, 10); //emcriptar la contraseña

  return await this.userService.create(singUpDto);
}



async singIn(singInDto){

  const user = await this.userService.findOneByEmail(singInDto.email);//buscamos el email en la base de datos
  if(!user){
    return new UnauthorizedException('Invalid credentials');
  }

  const isMatch = await bcryptjs.compare(singInDto.password, user.password); //compara la contraseña encriptada con la que se ingresa
  if(!isMatch){
    return new UnauthorizedException('Invalid credentials');
  }
  const payload = { email: user.email, sub: user.id };

  const token = this.JwtService.sign(payload);//creamos el token 

  return {
    access_token: token,
    token_type: 'Bearer',
    expires_in: 3600,
    email: user.email,
  };
}





/*

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
  */
}
