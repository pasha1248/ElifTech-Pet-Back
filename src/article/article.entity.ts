import { Column, Entity, JoinColumn, OneToMany, ManyToOne } from 'typeorm';
import { CommentEntity } from 'src/comment/comment.entity';
import { Base } from 'src/config/base';
import { UserEntity } from 'src/user/entity/user.entity';

@Entity('Article')
export class ArticleEntity extends Base {
  @Column()
  name: string;

  @Column({ default: false, name: 'is_public' })
  isPublic: boolean;

  @Column({ default: 0 })
  views?: number;

  @Column({ default: 0 })
  likes?: number;

  @Column({ default: '', type: 'text' })
  description: string;

  @Column({ default: '', type: 'text' })
  videoPath: string;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.articles)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.article)
  comments: CommentEntity[];
}
