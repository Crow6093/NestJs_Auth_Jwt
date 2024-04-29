import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength,IsOptional } from 'class-validator';

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    name: string;


    @IsString()    
    @IsOptional()
    surname?: string;
    
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsOptional()
    @IsNumber()
    roleId?: number;

    @IsOptional()
    updatedAt?: Date;
}
