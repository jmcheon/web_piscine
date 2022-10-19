import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { createCatDto } from './createCatDto';
import { Cat } from './interface/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  findAll(): Cat[] {
    return this.catsService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `This action returns a #${id} cat.`;
  }
  @Post()
  create(@Body() createCatDto: createCatDto) {
    return this.catsService.create(createCatDto);
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() createCatDto: createCatDto) {
    return `This actions updates a #${id} cat.`;
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat.`;
  }
}
