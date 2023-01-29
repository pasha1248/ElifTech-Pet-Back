import { Base } from 'src/config/base';
import { Column, Entity } from 'typeorm';

@Entity('onlineUser')
export class onlineUserEntity extends Base {
  @Column({ type: 'text', default: '' })
  idOnliteUser: string;

  @Column({ type: 'text', default: '' })
  socketId: string;
}
