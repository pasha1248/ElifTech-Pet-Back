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
}
