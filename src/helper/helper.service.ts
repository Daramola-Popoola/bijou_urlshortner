import {  Injectable, UnauthorizedException } from '@nestjs/common';
import * as Bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './helper.dto';

@Injectable()
export class HelperService {
    constructor(private readonly jwt: JwtService, private readonly configService: ConfigService){} 
    
    async hashPassword(raw: string): Promise<string>{
        const salt = await Bcrypt.genSalt();
        const hash = await Bcrypt.hash(raw, salt)
        
        return hash;
    }
    
    async authenticatePassword( passCode: string, hashString: string,): Promise<string | boolean>{
        const result = await Bcrypt.compare(passCode, hashString);
        
        return result;
    }
    
    
    async signToken(payload: TokenPayload ): Promise<string>{
        const tokenize = await this.jwt.signAsync(payload, {secret: this.configService.get<string>('JWT_SECRET'), expiresIn: "2h"});
        
        
        return tokenize;
    }
    
    async authenticateToken(token: string): Promise<boolean | TokenPayload>{
        try{
            const authToken: TokenPayload = await this.jwt.verifyAsync(token, {secret: this.configService.get('JWT_SECRET')});
        
            if(!authToken) return false;
            return authToken;
            
        }catch(err){
            throw new UnauthorizedException("sorry you cannot acccess this resource", {description: `access denied`});
        }
       
    }
    
    
    async generateUrl(): Promise<string>{
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        let sequence = "";
        for(let i = 1; i<=10; i++){
            sequence += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        return sequence;
    }
}
