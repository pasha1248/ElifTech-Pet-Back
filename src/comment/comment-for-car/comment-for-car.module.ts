import { Module } from '@nestjs/common';
import { CommentForCarService } from './comment-for-car.service';
import { CommentForCarController } from './comment-for-car.controller';

@Module({
  controllers: [CommentForCarController],
  providers: [CommentForCarService]
})
export class CommentForCarModule {}
