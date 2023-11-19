import { Controller, Post, Body, Req, Res} from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlPartialDto } from './dto/create-url.dto';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post('create')
  async cretaeUrl(@Body() createUrlDto: CreateUrlPartialDto, @Req() req, @Res() res){
    
    return await this.urlService.createUrl(createUrlDto, req, res);
  }
}
