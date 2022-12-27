import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhereProperty, ILike, MoreThan, Repository } from 'typeorm';
import { ArticleDto } from './article.dto';
import { ArticleEntity } from './article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) {}

  // by-id
  async byId(id: string, isPublic = false) {
    const article = await this.articleRepository.findOne({
      where: { id },
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
          subscribersCount: true,
          subscriptions: true,
        },
        comments: {
          message: true,
          id: true,
          user: {
            id: true,
            lastName: true,
            firstName: true,
            avatarPath: true,
            subscribersCount: true,
          },
        },
      },
    });
    if (!article) throw new NotFoundException('Video Is not Found');
    return article;
  }

  //update
  async update(id: string, dto: ArticleDto) {
    const article = await this.byId(id);

    return this.articleRepository.save({
      ...article,
      ...dto,
    });
  }

  //subscribe

  //getAll
  async getAll(searchTerm?: string) {
    let options: FindOptionsWhereProperty<ArticleEntity> = {};

    if (searchTerm) {
      options = {
        name: ILike(`%${searchTerm}%`),
      };
    }

    return this.articleRepository.find({
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
  }

  async getMostPopulByViews() {
    return this.articleRepository.find({
      where: {
        views: MoreThan(0),
      },
      relations: {
        user: true,
      },
      select: {
        user: {
          id: true,
          lastName: true,
          firstName: true,
          avatarPath: true,
        },
      },
      order: {
        views: -1,
      },
    });
  }

  async create(userId: string) {
    const defaultValue = {
      name: '',
      user: { id: userId },
      videoPath: '',
      description: '',
      thumbnailPath: '',
    };

    const newArticle = this.articleRepository.create(defaultValue);
    const article = await this.articleRepository.save(newArticle);
    return article.id;
  }

  async delete(id: string) {
    return await this.articleRepository.delete({ id });
  }

  async updateCountViews(id: string) {
    const article = await this.byId(id);
    article.views++;
    return this.articleRepository.save(article);
  }

  async updateReaction(id: string) {
    const article = await this.byId(id);
    article.likes++;
    return this.articleRepository.save(article);
  }
}
