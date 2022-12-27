import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from 'src/article/article.entity';
import { UserEntity } from 'src/user/entity/user.entity';
import { FindOptionsWhereProperty, ILike, Repository } from 'typeorm';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getAll(searchTerm?: string) {
    let options: FindOptionsWhereProperty<ArticleEntity | UserEntity> = {};

    if (searchTerm) {
      options = {
        name: ILike(`%${searchTerm}%`),
      };
    }

    const article = await this.articleRepository.find({
      where: {
        ...options,
      },
      order: {
        createdAt: 'DESC',
      },
      relations: {
        user: true,
        comments: {
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
    console.log(options);

    const userFirstName = await this.userRepository.find({
      where: {
        firstName: ILike(`%${searchTerm}%`),
        //   lastName: ILike(`%${searchTerm}%`),
      },
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
    const userLastName = await this.userRepository.find({
      where: {
        //   firstName: ILike(`%${searchTerm}%`),
        lastName: ILike(`%${searchTerm}%`),
      },
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

    const response = [...userFirstName, ...userLastName, article];

    return response;
  }
}
