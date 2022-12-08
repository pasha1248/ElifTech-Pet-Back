import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';

import { CommentDto } from './comment.dto';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(AccessTokenGuard)
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  async createComment(@Req() req: Request, @Body() dto: CommentDto) {
    const id = req.user?.['id'];
    return this.commentService.create(id, dto);
  }
}
