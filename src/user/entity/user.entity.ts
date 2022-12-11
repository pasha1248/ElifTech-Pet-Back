import { ArticleEntity } from 'src/article/article.entity';
import { CarEntity } from 'src/car/entities/car.entity';
import { Base } from 'src/config/base';
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

  @OneToMany(() => ArticleEntity, (article) => article.user)
  articles: ArticleEntity[];

  @OneToMany(() => SubscriptionEntity, (sub) => sub.fromUser)
  subscriptions: SubscriptionEntity[];

  @OneToMany(() => SubscriptionEntity, (sub) => sub.toChannel)
  subscribers: SubscriptionEntity[];

  @OneToMany(() => CarEntity, (car) => car.subscribers)
  carSubscriptions: CarEntity[];

  @OneToMany(() => CarEntity, (car) => car.user)
  cars: CarEntity[];
}
