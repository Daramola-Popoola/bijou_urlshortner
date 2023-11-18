import { OmitType } from "@nestjs/mapped-types";
import { AuthEntity } from "../entities/auth.entity";
import { IsString, IsEmail, IsNotEmpty,  Length} from "class-validator";
export class CreateAuthDto extends OmitType(AuthEntity, ["id", "createdAt", "updatedAt"]) {
    @IsString()
    @IsNotEmpty()
    username: string;
    
    @IsString()
    @IsNotEmpty()
    @Length(6, 20, {message: "password must be a minimum of 6 and a maximum of 20 characters"})
    password: string;
    
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    
}


export class SignInAuthDto {
   @IsString()
   @IsEmail()
   @IsNotEmpty()
   email: string;
   
   @IsString()
   @IsNotEmpty()
   password: string;
}