import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentDto } from './comment.dto';
import { CommentEntity } from './comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
  ) {}

  async create(userId: string, dto: CommentDto) {
    const newComment = this.commentRepository.create({
      message: dto.message,
      article: { id: dto.articleId },
      user: { id: userId },
    });
    return this.commentRepository.save(newComment);
  }
}
