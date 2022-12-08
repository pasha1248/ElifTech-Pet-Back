import { IsNumber, IsString } from 'class-validator';

export class CommentDto {
  @IsString()
  message: string;

  @IsString()
  articleId: string;
}
