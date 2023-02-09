import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from './entities/course.entity';
import { CoursePhotoEntity } from './entities/photo-course.entity';
import { LessonsModule } from './lessons/lessons.module';

@Module({
  controllers: [CourseController],
  providers: [CourseService],
  imports: [
    TypeOrmModule.forFeature([CourseEntity, CoursePhotoEntity]),
    LessonsModule,
  ],
})
export class CourseModule {}
