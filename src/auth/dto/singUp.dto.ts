import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class SingUpDto {

    @Transform(({ value }) => value.trim())  //se ejecuta antes que el resto de validaciones
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;
    
    @Transform(({ value }) => value.trim())  
    @IsString()
    @MinLength(8)
    password: string;
    
}
