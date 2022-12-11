import { Test, TestingModule } from '@nestjs/testing';
import { CommentForCarController } from './comment-for-car.controller';
import { CommentForCarService } from './comment-for-car.service';

describe('CommentForCarController', () => {
  let controller: CommentForCarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentForCarController],
      providers: [CommentForCarService],
    }).compile();

    controller = module.get<CommentForCarController>(CommentForCarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
