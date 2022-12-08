import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ArticleService } from './acticle.service';
import { ArticleController } from './article.controller';
import { ArticleEntity } from './article.entity';

@Module({
  controllers: [ArticleController],
  providers: [ArticleService],
  imports: [TypeOrmModule.forFeature([ArticleEntity])],
})
export class ArticleModule {}
