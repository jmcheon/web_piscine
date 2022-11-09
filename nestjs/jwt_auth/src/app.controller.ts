import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { GetCurrentUserById } from './utils';
import { JwtAuthGurad } from './utils/guards/jwt-guard.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JwtAuthGurad)
  @Get()
  getHello(@GetCurrentUserById() userId: number): string {
    console.log('getHello() controller', userId);
    return this.appService.getHello(userId);
  }
}
