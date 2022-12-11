import { CommentEntity } from 'src/comment/comment.entity';
import { Base } from 'src/config/base';
import { UserEntity } from 'src/user/entity/user.entity';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';

@Entity('car')
export class CarEntity extends Base {
  @Column()
  name: string;

  @Column({ default: 0 })
  rate?: number;

  @Column()
  model: string;

  @Column({ default: '', type: 'text' })
  description: string;

  @Column({ default: '', type: 'text', name: 'video_path' })
  photoPath: string;

  @Column()
  generation: string;

  @Column()
  yearOfPurchase: string;

  @Column()
  year: string;

  @Column()
  color: string;

  @Column({ default: false })
  pastCar: boolean;

  @Column()
  brand: string;

  @Column()
  engineCapacityLiters: string;

  @Column()
  distance: string;

  @Column()
  motor: string;

  @ManyToOne(() => UserEntity, (car: UserEntity) => car.cars)
  user: UserEntity;

  @OneToMany(() => CommentEntity, (comment: CommentEntity) => comment.car)
  comments: CommentEntity[];

  @ManyToMany(() => UserEntity, (user: UserEntity) => user.carSubscriptions)
  subscribers: UserEntity[];
}
