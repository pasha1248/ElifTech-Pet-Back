import { Column, Entity, JoinColumn, OneToMany, ManyToOne } from 'typeorm';

import { ArticleEntity } from 'src/article/article.entity';
import { Base } from 'src/config/base';
import { UserEntity } from 'src/user/entity/user.entity';
import { CourseEntity } from 'src/course/entities/Course.entity';
import { SectionsEntity } from './section.entity';

@Entity('lesson')
export class LessonEntity extends Base {
  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ default: '' })
  videoPath: string;

  @ManyToOne(() => CourseEntity, (course) => course.lessons)
  course: CourseEntity;

  @ManyToOne(() => SectionsEntity, (course) => course.lessons)
  section: SectionsEntity;
}
