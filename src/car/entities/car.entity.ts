import { CommentEntity } from 'src/comment/comment.entity';
import { Base } from 'src/config/base';
import { UserEntity } from 'src/user/entity/user.entity';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { CarsPhotoEntity } from './photo-car.entity';

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
  transmission: string;

  @Column()
  driveUnit: string;

  @Column()
  mileage: string;

  @Column()
  motor: string;

  @OneToMany(() => CarsPhotoEntity, (photos) => photos.carOwner)
  photosPath: CarsPhotoEntity[];

  @ManyToOne(() => UserEntity, (car: UserEntity) => car.cars)
  user: UserEntity;

  @OneToMany(() => CommentEntity, (comment: CommentEntity) => comment.car)
  comments: CommentEntity[];

  @ManyToMany(() => UserEntity, (user: UserEntity) => user.carSubscriptions)
  subscribers: UserEntity[];
}
