import { Injectable, NotFoundException } from '@nestjs/common';
import {Request, Response } from 'express';
import { GetTaskDto, taskShape } from './dto/get-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { HelperService } from 'src/helper/helper.service';
import { TokenPayload } from 'src/helper/helper.dto';

@Injectable()
export class TasksService {
  constructor(private readonly Prisma: PrismaService, private readonly helper: HelperService){}
  
  private readonly urlModel = this.Prisma.url;
  
  async findAllUrl(getUrlDto: GetTaskDto, req: Request, res: Response){
    const tokenString = (req.headers['authorization'] as string).split(" ")[1];
    
    const authToken = await this.helper.authenticateToken(tokenString);
    try{
      const allUrls: GetTaskDto[] = await this.urlModel.findMany({where: {userId: (authToken as TokenPayload).id},
      select: {
        ...taskShape
      }
    });
     if(allUrls.length == 0) throw new NotFoundException('no record found');
      return res.json({mg: `successful`, payload: allUrls, status: `OK`});
      
    }catch(err){
      throw new NotFoundException('no record found');
    }
  }
}
