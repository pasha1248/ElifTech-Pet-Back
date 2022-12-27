import { AuthService } from '../auth/auth.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { ArticleService } from './acticle.service';
import { ArticleDto } from './article.dto';
import { Request, Response } from 'express';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';

@UseGuards(AccessTokenGuard)
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get('most-popular')
  async getMostPopularByViews() {
    return this.articleService.getMostPopulByViews();
  }

  @Get(':id')
  async getArticle(@Param('id') id: string) {
    return this.articleService.byId(id);
  }

  @HttpCode(200)
  @Post()
  async createArticle(@Req() req: Request) {
    const id = req.user?.['id'];
    return this.articleService.create(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  async updateArticle(@Param('id') id: string, @Body() dto: ArticleDto) {
    return this.articleService.update(id, dto);
  }

  @HttpCode(200)
  @Delete(':id')
  async deleteArticle(@Param('id') id: string) {
    return this.articleService.delete(id);
  }

  @HttpCode(200)
  @Put('update-views/:articleId')
  async updateViews(@Param('articleId') articleId: string) {
    console.log(articleId);
    return this.articleService.updateCountViews(articleId);
  }

  @HttpCode(200)
  @Put('update-likes/:articleId')
  async updateLike(@Param('articleId') articleId: string) {
    return this.articleService.updateReaction(articleId);
  }
}
