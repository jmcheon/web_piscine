import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/local/login')
  loginLocal(@Body() authDto: AuthDto) {
    return this.authService.loginLocal(authDto);
  }

  // @Post('/local/register')
  // registerLocal(@Body() authDto: AuthDto) {
  // return this.authService.registerLocal(authDto);
  // }
}
