import { ForbiddenException, Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import {Request, Response} from 'express';
import { CreateUrlPartialDto } from './dto/create-url.dto';
import { HelperService } from 'src/helper/helper.service';
import { TokenPayload } from 'src/helper/helper.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UrlService {
  
  constructor(private readonly prisma: PrismaService, private readonly helper: HelperService){}
  private readonly logger = new Logger(UrlService.name);
  private readonly urlModel = this.prisma.url;
  
  async createUrl(createUrlDto: CreateUrlPartialDto, req: Request, res: Response) {
    const tokenString = (req.headers['authorization'] as string).split(" ")[1];
    
    const authToken: TokenPayload  | boolean = await this.helper.authenticateToken(tokenString);
    
    if(!authToken) throw new ForbiddenException();
    try{
      const tokenValueId = (authToken as TokenPayload).id;
      const shortUrl = await this.helper.generateUrl();
      
      const createUrl = await this.urlModel.create({data: {
        ...createUrlDto,
        shortUrl,
        userId: tokenValueId
      }});
      
      return res.json({msg: `url successfully created`, payload: createUrl, status: `OK`});
      
    }catch(err){
      this.logger.error(err);
      
      throw new HttpException('server error', HttpStatus.INTERNAL_SERVER_ERROR);
      
    }
    
  }
}
