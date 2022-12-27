import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from 'src/article/article.entity';
import { UserEntity } from 'src/user/entity/user.entity';

@Module({
  controllers: [SearchController],
  providers: [SearchService],
  imports: [TypeOrmModule.forFeature([ArticleEntity, UserEntity])],
})
export class SearchModule {}
