import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Base } from 'src/config/base';
import { CourseEntity } from './course.entity';

@Entity('Courses-photo')
export class CoursePhotoEntity extends Base {
  @Column()
  isMain: boolean;

  @Column()
  path: string;

  // @ManyToOne(() => CourseEntity, (Courses) => Courses.photosPath)
  // CourseOwner: CourseEntity;
}
