import { CommentEntity } from 'src/comment/comment.entity';
import { Base } from 'src/config/base';
import { UserEntity } from 'src/user/entity/user.entity';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { LessonEntity } from '../lessons/entities/lessons.entity';
import { SectionsEntity } from '../lessons/entities/section.entity';
import { CoursePhotoEntity } from './photo-course.entity';

@Entity('Course')
export class CourseEntity extends Base {
  @Column()
  name: string;

  @Column()
  category: string;

  @Column()
  description: string;

  @Column()
  level: string;

  @Column()
  plan: string;

  // @OneToMany(() => CoursePhotoEntity, (photos) => photos.CourseOwner)
  // photosPath: CoursePhotoEntity[];

  @Column({ default: '' })
  uploadDataPhoto: string;

  @Column({ default: '' })
  uploadDataVideo: string;

  @ManyToOne(() => UserEntity, (Course: UserEntity) => Course.createdCourses)
  user: UserEntity;

  @OneToMany(() => CommentEntity, (comment: CommentEntity) => comment.course)
  commentsCourse: CommentEntity[];

  @ManyToMany(() => UserEntity, (user: UserEntity) => user.courseSubscriptions)
  subscribers: UserEntity[];

  @OneToMany(() => LessonEntity, (lesson: LessonEntity) => lesson.course)
  lessons: LessonEntity[];

  @OneToMany(
    () => SectionsEntity,
    (sections: SectionsEntity) => sections.course,
  )
  sections: SectionsEntity[];
}
