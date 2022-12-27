import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  ManyToOne,
  OneToOne,
} from 'typeorm';

import { Base } from 'src/config/base';
import { UserEntity } from 'src/user/entity/user.entity';
import { MessageEntity } from 'src/message/message.entity';

@Entity('chat')
export class ChatEntity extends Base {
  @Column()
  senderId: string;

  @ManyToOne(() => UserEntity, (chat) => chat.chats)
  receiverId: UserEntity;

  @OneToMany(() => MessageEntity, (message) => message.chatOwner)
  messages: MessageEntity[];
}
