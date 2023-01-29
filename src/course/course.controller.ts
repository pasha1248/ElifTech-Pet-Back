import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-Course.dto';
import { UpdateCourseDto } from './dto/update-Course.dto';

@UseGuards(AccessTokenGuard)
@Controller('course')
export class CourseController {
  constructor(private readonly CourseService: CourseService) {}

  @Post()
  create(@Body() createCourseDto: CreateCourseDto, @Req() req: Request) {
    const userId = req.user?.['id'];
    // new Id Here
    return this.CourseService.create(userId, createCourseDto);
  }

  @Get()
  findAll() {
    return this.CourseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.CourseService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.CourseService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.CourseService.remove(+id);
  }
}
