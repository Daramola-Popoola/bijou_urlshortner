import { BadRequestException, ForbiddenException, HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import {Request, Response} from 'express';
import { CreateAuthDto, SignInAuthDto } from './dto/create-auth.dto';
import { PrismaService } from '../prisma/prisma.service';
import { HelperService } from '..//helper/helper.service';
import { TokenPayload } from '../helper/helper.dto';

@Injectable()
export class AuthService {
  
  constructor(private readonly prismaService: PrismaService, private readonly helper: HelperService ){}
  private readonly logger = new Logger(AuthService.name);
  
  private readonly userModel = this.prismaService.user
  async signUp(createAuthDto: CreateAuthDto) {
    const {password, email} = createAuthDto;
    
    const confirmUserState: CreateAuthDto = await this.userModel.findUnique({where: {email}});
    
    if(confirmUserState) throw new BadRequestException("hmm, this user already exist, why dont you try logging in", {cause: new Error(), description: "user trying to create an account eith an existing email"});
    
    try{
      const hashed_password = await this.helper.hashPassword(password);
      
      const createUser = await this.userModel.create({data: {...createAuthDto, password: hashed_password}});
      
      return `hi!, ${createUser.username}, you are welcome aboard`;
    }catch(err){
      throw new HttpException('server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  async signIn(signInAuthDto: SignInAuthDto, req: Request, res: Response){
    const {email, password} = signInAuthDto;
    
    const foundUser = await this.userModel.findUnique({where: {email}});
    
    if(!foundUser) throw new BadRequestException('invalid email address', { cause: new Error()});
    
    const authenticatePasscode = await this.helper.authenticatePassword(password, foundUser.password);
    
    if(!authenticatePasscode) throw new ForbiddenException('invalid passsword, check that and try again', { cause: new Error()})
    
    const payload = {id: foundUser.id, email: foundUser.email};
    
    const token = await this.helper.signToken(payload);
    
    if(!token) throw new ForbiddenException();
    
    res.header('Authorization', [`Bearer ${token}`]);
    
    return res.json({msg:`Hi!, ${foundUser.username}.`});
    
  } 
  
 
  async signOut(req: Request, res: Response){
    const tokenValue = req.headers["authorization"] as string;
    const rawToken = tokenValue.split(" ")[1];
    
    const verifyToken = await this.helper.authenticateToken(rawToken);
    
    if(!verifyToken) throw new ForbiddenException("unauthorized!, session expired");
    
    res.header("Authorization", [`Bearer logged out`]);
    
    return res.json({msg: `bye, see you next time`})
  } 
  
  
  async deleteAccount(req: Request, res: Response){
    const tokenValue = req.headers["authorization"] as string;
    const rawToken = tokenValue.split(" ")[1];
    const verifyToken = await this.helper.authenticateToken(rawToken);
    
    if(!verifyToken) throw new ForbiddenException(`unauthorized`);
    
    const validCredentials = (verifyToken as TokenPayload).email
    
    try{
      
      const destroyUser = await this.userModel.delete({where: {email: validCredentials}});
      
      if(!destroyUser) throw new ForbiddenException("unauthorized");
      
      return res.json({msg: `user account deleted`, status: "OK"});
      
    }catch(err){
      
      this.logger.error(`this is going to end up a server error`, err);
      throw new HttpException('server error', HttpStatus.INTERNAL_SERVER_ERROR)
      
    } 
     
  }

}
