import { OmitType, PickType } from '@nestjs/mapped-types';
import {IsString, IsNotEmpty} from 'class-validator';
import { UrlEntity } from "../entities/url.entity";


export class CreateUrlDto extends OmitType(UrlEntity, ['id', 'createdAt', 'updatedAt']) {
    @IsString()
    @IsNotEmpty()
    title: string; 
    
    @IsString()
    @IsNotEmpty()
    actualUrl: string;
    
    @IsString()
    @IsNotEmpty()
    shortUrl: string;
    
    @IsString()
    @IsNotEmpty()
    userId: string;
    
}


 export class CreateUrlPartialDto extends PickType(CreateUrlDto, ['title', 'actualUrl']){}
