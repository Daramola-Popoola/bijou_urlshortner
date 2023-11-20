import { ForbiddenException, Injectable, HttpException, HttpStatus, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import {Request, Response} from 'express';
import { CreateUrlPartialDto, IUrlModel } from './dto/create-url.dto';
import { HelperService } from 'src/helper/helper.service';
import { TokenPayload } from 'src/helper/helper.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUrlDto } from './dto/update-url.dto';

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
  
  async gotoUrl(url: string, req: Request, res: Response){
    const foundUrl = await this.urlModel.findFirst({where: {shortUrl: url}});
    
    if(!foundUrl) throw new NotFoundException('this URL does not exist', {description: "not found"});
    
    return res.redirect(foundUrl.actualUrl);
    
    
  }
  
  
  async updateUrl(updateUrlDto: UpdateUrlDto, shortUrl: string, req: Request, res: Response){
    const tokenString = (req.headers['authorization'] as string).split(" ")[1];
    
    const authToken = await this.helper.authenticateToken(tokenString);
     
    if(!authToken) throw new ForbiddenException("forbidden");
    
    const updatedUrl = await this.urlModel.update({
      where: {
        userId: (authToken as TokenPayload).id,
        shortUrl
      },
      data: {
        ...updateUrlDto
      }
    });
    
    
    if(!updatedUrl) throw new BadRequestException();
    
    return res.json({msg: `url successfully updated`, payload: updatedUrl, status: `OK`});
    
  }
  
  async deleteUrl(shortUrl, req: Request , res: Response){
    const tokenString = (req.headers["authorization"] as string).split(" ")[1];
    const authToken = await this.helper.authenticateToken(tokenString);
    
    if(!authToken) throw new ForbiddenException("forbidden");
    try{
      
      
       await this.urlModel.delete({where: {
        userId: (authToken as TokenPayload).id,
        shortUrl 
      }});
      
      
      return res.json({msg: `url sucessfully deleted`, status: `OK`});
      
    }catch(err){
      throw new HttpException('Url not found', HttpStatus.NOT_FOUND)
    }
   
  }
}
