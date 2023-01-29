import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';
import { FindOptionsWhereProperty, ILike, Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-Course.dto';
import { UpdateCourseDto } from './dto/update-Course.dto';
import { CourseEntity } from './entities/Course.entity';
import { CoursePhotoEntity } from './entities/photo-course.entity';

@UseGuards(AccessTokenGuard)
@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseEntity)
    private readonly CourseRepository: Repository<CourseEntity>,
    @InjectRepository(CoursePhotoEntity)
    private readonly CoursesPhotoRepository: Repository<CoursePhotoEntity>,
  ) {}

  async create(userId: string, createCourseDto: CreateCourseDto) {
    const newCourse = this.CourseRepository.create({
      ...createCourseDto,
      user: { id: userId },
    });
    const Course = await this.CourseRepository.save(newCourse);

    // photoPath.map(async (photoId: string) => {
    //   const save = await this.CoursesPhotoRepository.findOne({
    //     where: {
    //       id: photoId,
    //     },
    //   });
    //   save.CourseOwner = Course;

    //   await this.CoursesPhotoRepository.save(save);
    // });
    return Course.id;
  }

  async findAll() {
    return `This action returns all Course`;
  }

  async findOne(userId: string) {
    const Course = await this.CourseRepository.findOne({
      where: { id: userId },
    });

    return Course;
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} Course`;
  }

  async remove(id: number) {
    return `This action removes a #${id} Course`;
  }

  async getAll(searchTerm?: string) {
    let options: FindOptionsWhereProperty<CourseEntity> = {};

    if (searchTerm) {
      options = {
        name: ILike(`%${searchTerm}%`),
      };
    }

    return this.CourseRepository.find({
      where: {
        ...options,
      },
      order: {
        createdAt: 'DESC',
      },
      relations: {
        user: true,
        commentsCourse: {
          user: true,
        },
      },
      select: {
        user: {
          id: true,
          firstName: true,
          lastName: true,
          avatarPath: true,
        },
      },
    });
  }
}
