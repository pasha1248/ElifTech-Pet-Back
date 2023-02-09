import { Base } from 'src/config/base';
import { CourseEntity } from 'src/course/entities/Course.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { LessonEntity } from './lessons.entity';

@Entity('section')
export class SectionsEntity extends Base {
  @Column({ default: '' })
  name: string;

  @OneToMany(() => LessonEntity, (course) => course.section)
  lessons: LessonEntity[];

  @ManyToOne(() => CourseEntity, (course) => course.sections)
  course: CourseEntity;
}
