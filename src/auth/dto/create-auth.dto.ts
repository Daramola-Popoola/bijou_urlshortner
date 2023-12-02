import {ApiProperty} from '@nestjs/swagger';
import { OmitType } from "@nestjs/mapped-types";
import { AuthEntity } from "../entities/auth.entity";
import { IsString, IsEmail, IsNotEmpty,  Length} from "class-validator";
export class CreateAuthDto extends OmitType(AuthEntity, ["id", "createdAt", "updatedAt"]) {
    @ApiProperty({
        description: `this is the user desired username`,
        example: `JohnDoe`
    })
    @IsString()
    @IsNotEmpty()
    username: string;
    
    @ApiProperty({
        description: `input the password, the password must be a minimum of 6 and max of 20 chars`,
        example: `PasswoRd@123`
    })
    @IsString() 
    @IsNotEmpty()
    @Length(6, 20, {message: "password must be a minimum of 6 and a maximum of 20 characters"})
    password: string;
    
    @ApiProperty({
        description: `input the email address`,
        example: `john@mail.com`
    })
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    
}


export class SignInAuthDto {
    @ApiProperty({
        description: `input the email address`,
        example: `john@mail.com`
    })
   @IsString()
   @IsEmail()
   @IsNotEmpty()
   email: string;
   
   @ApiProperty({
    description: `input the password, the password must be a minimum of 6 and max of 20 chars`,
    example: `PasswoRd@123`
})
   @IsString()
   @IsNotEmpty()
   password: string;
}