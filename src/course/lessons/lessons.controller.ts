import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';
import { LessonsService } from './lessons.service';

@UseGuards(AccessTokenGuard)
@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}
  @Get('create-section')
  createSection(
    @Query('section') section: string,
    @Query('id') id: string,
    @Req() req: Request,
  ) {
    const userId = req.user?.['id'];
    // new Id Here
    return this.lessonsService.createSection(userId, section, id);
  }

  @Post('create-lesson')
  createLesson(@Body() body: unknown, @Req() req: Request) {
    const userId = req.user?.['id'];
    // new Id Here
    // return this.lessonsService.createSection(userId, section);
  }

  @Get('update-sectionName')
  updateSectionName(
    @Query('section') section: string,
    @Query('id') id: string,
    @Req() req: Request,
  ) {
    const userId = req.user?.['id'];
    // new Id Here
    return this.lessonsService.updateSectionName(userId, section, id);
  }

  // @Get()
  // findAll(@Query('count') count?: number) {
  //   return this.lessonsService.findAll(count);
  // }

  // @Get('my-courses')
  // findAllMyCourses(@Req() req: Request) {
  //   const id = req.user?.['id'];
  //   return this.CourseService.findCourseByOwner(id);
  // }

  // @Get(':id')
  // findOneCourse(@Param('id') id: string, @Req() req: Request) {
  //   const userId = req.user?.['id'];
  //   return this.CourseService.findCoutseById(id, userId);
  // }
}
