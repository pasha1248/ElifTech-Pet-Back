import { UserEntity } from './entity/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Base } from 'src/config/base';

@Entity('Subscription')
export class SubscriptionEntity extends Base {
  @ManyToOne(() => UserEntity, (user) => user.subscriptions)
  @JoinColumn({ name: 'from_user_id' })
  fromUser: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.subscribers)
  @JoinColumn({ name: 'to_chanel_id' })
  toChannel: UserEntity;
}
