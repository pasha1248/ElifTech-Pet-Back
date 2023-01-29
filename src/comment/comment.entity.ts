import { Column, Entity, JoinColumn, OneToMany, ManyToOne } from 'typeorm';

import { ArticleEntity } from 'src/article/article.entity';
import { Base } from 'src/config/base';
import { UserEntity } from 'src/user/entity/user.entity';
import { CourseEntity } from 'src/course/entities/Course.entity';

@Entity('comment1')
export class CommentEntity extends Base {
  @Column({ type: 'text' })
  message: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => ArticleEntity, (article) => article.comments)
  @JoinColumn({ name: 'article_id' })
  article: ArticleEntity;

  @ManyToOne(() => CourseEntity, (course) => course.commentsCourse)
  @JoinColumn({ name: 'car_id' })
  course: CourseEntity[];
}
