import { CommentEntity } from 'src/comment/comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { CommentForCarModule } from './comment-for-car/comment-for-car.module';

@Module({
  controllers: [CommentController],
  providers: [CommentService],
  imports: [TypeOrmModule.forFeature([CommentEntity]), CommentForCarModule],
})
export class CommentModule {}
