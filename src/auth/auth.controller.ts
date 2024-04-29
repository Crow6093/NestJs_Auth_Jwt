import { Body, Controller, Get, Post, Request, UseGuards, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingUpDto } from './dto/singUp.dto';
import { SingInDto } from './dto/singIndto';
import { AuthGuard } from './guards/auth.guard';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}



@Post('/singup')
singUp( @Body() singUpDto: SingUpDto) {
return this.authService.singUp(singUpDto);
}

@Post('/singIn')
singIn(@Body() singInDto: SingInDto) {
  return this.authService.singIn(singInDto);
}

//de esta forma sacamos del token el correo del usuario para poder acceder a metodos sin necesidad de pasar la id del usuario
@Get('/me')
@UseGuards(AuthGuard)
profile(@Request() req): string {
  return req.user;
}

/*
  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
  */
}
