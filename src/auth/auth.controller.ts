import { Controller, Post, Get, Delete, Body, HttpCode, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto, SignInAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(201)
  async signUp(@Body() createAuthDto: CreateAuthDto) {
    return await this.authService.signUp(createAuthDto);
  }
  
  
  @Post('signin')
  @HttpCode(200)
  async signIn(@Body() signInAuthDto: SignInAuthDto, @Req() req, @Res() res){
    return await this.authService.signIn(signInAuthDto, req, res);
  }
  
  @Get('signout')
  async signOut(@Req() req, @Res() res){
    return await this.authService.signOut(req, res);
  }
  
  @Delete('delete-account')
async deleteAccount(@Req() req, @Res() res){
  return await this.authService.deleteAccount(req, res);
}
  
  
}
