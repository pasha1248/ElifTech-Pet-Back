import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Base } from 'src/config/base';
import { CarEntity } from './car.entity';

@Entity('car-photo')
export class CarsPhotoEntity extends Base {
  @Column()
  isMain: boolean;

  @Column()
  path: string;

  @ManyToOne(() => CarEntity, (car) => car.photosPath)
  carOwner: CarEntity;
}
