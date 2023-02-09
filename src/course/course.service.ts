import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';
import { FindOptionsWhereProperty, ILike, Like, Repository } from 'typeorm';
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

  async findAll(query) {
    const take = query?.take || 10;
    const skip = query?.skip || 0;
    const keyword = query?.keyword || '';
    const [result, total] = await this.CourseRepository.findAndCount({
      where: { name: Like('%' + keyword + '%') },
      order: { name: 'DESC' },
      take: take,
      skip: skip,
      relations: {
        user: true,
      },
      select: {
        user: {
          id: true,

          avatarPath: true,
        },
      },
    });

    return {
      data: result,
      count: total,
    };
  }

  async findCourseByOwner(userId: string) {
    const Course = await this.CourseRepository.find({
      where: { user: { id: userId } },
      relations: { user: true },
    });

    return Course;
  }

  async findCoutseById(id: string, userId: string) {
    const course = this.CourseRepository.findOne({
      where: { id: id },
      relations: { sections: true },
    });
    return course;
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
