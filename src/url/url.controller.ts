import { Controller, Get, Post, Put, Delete, Body, Req, Res, Param, Query} from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlPartialDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post('create')
  async cretaeUrl(@Body() createUrlDto: CreateUrlPartialDto, @Req() req, @Res() res){
    
    return await this.urlService.createUrl(createUrlDto, req, res);
  }
  
  @Get('/:shortUrl')
  async gotoUrl(@Param('shortUrl') shortUrl: string, @Req() req, @Res() res){
    
    return await this.urlService.gotoUrl(shortUrl, req, res);
  }
  
  @Put('/update/:shortUrl')
  async updateUrl(@Param('shortUrl') shortUrl: string, @Body() updateUrlDto: UpdateUrlDto, @Req() req, @Res() res){
    return await this.urlService.updateUrl(updateUrlDto, shortUrl, req, res)
  }
  
  @Delete('/delete?')
  async deleteUrl(@Query('shortUrl') shortUrl: string, @Req() req, @Res() res){
    return await this.urlService.deleteUrl(shortUrl, req, res);
    
  }
}
