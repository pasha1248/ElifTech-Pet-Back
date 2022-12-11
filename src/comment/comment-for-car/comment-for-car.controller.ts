import { Controller } from '@nestjs/common';
import { CommentForCarService } from './comment-for-car.service';

@Controller('comment-for-car')
export class CommentForCarController {
  constructor(private readonly commentForCarService: CommentForCarService) {}
}
