import { ArticleEntity } from 'src/article/article.entity';
import { ChatEntity } from 'src/chat/entity/chat.entity';
import { Base } from 'src/config/base';
import { CourseEntity } from 'src/course/entities/Course.entity';
import {
  Column,
  Entity,
  OneToOne,
  Index,
  JoinColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { SubscriptionEntity } from '../subscription.entity';

@Entity('user')
export class UserEntity extends Base {
  @Index()
  @Column({ type: 'varchar', length: 64 })
  firstName: string;

  @Index()
  @Column({ type: 'varchar', length: 64 })
  lastName: string;

  @Index()
  @Column({ type: 'varchar', length: 320, unique: true, nullable: false })
  email: string;

  @Column()
  password: string;

  @Column({ default: '123' })
  refreshTokenHash?: string;

  @Column({ default: '' })
  activationLink?: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ nullable: true })
  avatarPath: string;

  @Column({ default: '' })
  refreshPasswordCode: string;

  @Column({ default: 0, name: 'subscribers_count' })
  subscribersCount?: number;

  @Column({ default: '', type: 'text' })
  description: string;

  @OneToMany(() => ChatEntity, (chat) => chat.receiverId)
  chats: ChatEntity[];

  @OneToMany(() => ChatEntity, (chat) => chat.senderId)
  chatsSender: ChatEntity[];

  @OneToMany(() => ArticleEntity, (article) => article.user)
  articles: ArticleEntity[];

  @OneToMany(() => SubscriptionEntity, (sub) => sub.fromUser)
  subscriptions: SubscriptionEntity[];

  @OneToMany(() => SubscriptionEntity, (sub) => sub.toChannel)
  subscribers: SubscriptionEntity[];

  @OneToMany(() => CourseEntity, (car) => car.subscribers)
  courseSubscriptions: CourseEntity[];

  @OneToMany(() => CourseEntity, (couse) => couse.user)
  createdCourses: CourseEntity[];

  @OneToMany(() => CourseEntity, (couse) => couse.user)
  availableCourses: CourseEntity[];
}
