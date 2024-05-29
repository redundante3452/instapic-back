import { IsDate, IsEmail, IsOptional, IsString, MinLength,  } from "class-validator";

export class CreateUserDto{

    @IsEmail()
    email: string;

    @IsString()
    name: string;

    @IsString()
    last_name: string;

    @IsString()
    nickname: string;

    @IsOptional()
    @IsString()
    birth_date?: string;


    @IsString()
    @MinLength(6)
    password: string;
    
}
