import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LessonEntity } from './entities/lessons.entity';
import { SectionsEntity } from './entities/section.entity';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(LessonEntity)
    private readonly CourseRepository: Repository<LessonEntity>,
    @InjectRepository(SectionsEntity)
    private readonly SectionsEntity: Repository<SectionsEntity>,
  ) {}

  async createSection(userId: string, section: string, id: string) {
    console.log('id for back', id);
    const createSection = this.SectionsEntity.create({
      name: section,
      course: { id: id },
    });

    const save = await this.SectionsEntity.save(createSection);
    return save;
  }

  async updateSectionName(userId: string, section: string, id: string) {
    const updateSectionName = await this.SectionsEntity.findOne({
      where: {
        id: id,
      },
    });

    updateSectionName.name = section;

    const save = await this.SectionsEntity.save(updateSectionName);
    return save;
  }
}
