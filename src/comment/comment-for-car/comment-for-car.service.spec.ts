import { Test, TestingModule } from '@nestjs/testing';
import { CommentForCarService } from './comment-for-car.service';

describe('CommentForCarService', () => {
  let service: CommentForCarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentForCarService],
    }).compile();

    service = module.get<CommentForCarService>(CommentForCarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
