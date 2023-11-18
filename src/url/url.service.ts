import { Injectable } from '@nestjs/common';
import {Request, Response} from 'express';
import { CreateUrlPartialDto, CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';

@Injectable()
export class UrlService {
  async createUrl(createUrlDto: CreateUrlPartialDto, req: Request, res: Response) {
    const tokenValue = req.headers['authorization'] as string;
    
    
    
    return 'This action adds a new url';
  }

  findAll() {
    return `This action returns all url`;
  }

  findOne(id: number) {
    return `This action returns a #${id} url`;
  }

  update(id: number, updateUrlDto: UpdateUrlDto) {
    return `This action updates a #${id} url`;
  }

  remove(id: number) {
    return `This action removes a #${id} url`;
  }
}
