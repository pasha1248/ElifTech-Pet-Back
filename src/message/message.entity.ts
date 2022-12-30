import { Column, Entity, JoinColumn, OneToMany, ManyToOne } from 'typeorm';

import { Base } from 'src/config/base';
import { ChatEntity } from 'src/chat/entity/chat.entity';

@Entity('message')
export class MessageEntity extends Base {
  @Column({ type: 'text', default: '' })
  text: string;

  @Column({ type: 'text', default: '' })
  chatId: string;

  @Column({ type: 'text', default: '' })
  senderId: string;

  @ManyToOne(() => ChatEntity, (chat) => chat.messages)
  chatOwner: ChatEntity;

  //   @ManyToOne(() => UserEntity, (user) => user.messages)
  //   author: UserEntity;

  //   @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  //   conversation: Conversation;
}
