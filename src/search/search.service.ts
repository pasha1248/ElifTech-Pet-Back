import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from 'src/article/article.entity';
import { CourseEntity } from 'src/course/entities/Course.entity';
import { UserEntity } from 'src/user/entity/user.entity';
import { FindOptionsWhereProperty, ILike, Repository } from 'typeorm';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(CourseEntity)
    private readonly courseEntity: Repository<CourseEntity>,
  ) {}

  async getAll(searchTerm?: string) {
    let options: FindOptionsWhereProperty<ArticleEntity | UserEntity> = {};

    if (searchTerm) {
      options = {
        name: ILike(`%${searchTerm}%`),
      };
    }

    const course = await this.courseEntity.find({
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

    options = {
      firstName: ILike(`%${searchTerm}%`),
      lastName: ILike(`%${searchTerm}%`),
    };
    // console.log(options);

    const userFirstName = await this.userRepository.find({
      where: [
        { firstName: ILike(`%${searchTerm}%`) },
        { lastName: ILike(`%${searchTerm}%`) },
      ],
      order: {
        createdAt: 'DESC',
      },
      relations: {},
      select: {
        id: true,
        firstName: true,
        lastName: true,
        avatarPath: true,
      },
    });
    // const userLastName = await this.userRepository.find({
    //   where: {
    //     //   firstName: ILike(`%${searchTerm}%`),
    //     lastName: ILike(`%${searchTerm}%`),
    //   },
    //   order: {
    //     createdAt: 'DESC',
    //   },
    //   relations: {},
    //   select: {
    //     id: true,
    //     firstName: true,
    //     lastName: true,
    //     avatarPath: true,
    //   },
    // });

    const response = [...userFirstName, ...course];
    console.log('response', response);

    return [...userFirstName, ...course];
  }
}
