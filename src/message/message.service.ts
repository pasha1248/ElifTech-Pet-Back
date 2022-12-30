import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageEntity } from './message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepo: Repository<MessageEntity>,
  ) {}

  async createNewMessage(userId: string, dto: CreateMessageDto) {
    console.log(userId, dto.senderId);
    if (userId !== dto.senderId) {
      throw new HttpException('No access', HttpStatus.BAD_REQUEST);
    }

    const newMessage = this.messageRepo.create({
      ...dto,
      chatOwner: { id: dto.chatId },
    });

    const saveMessage = await this.messageRepo.save(newMessage);

    return {
      message: saveMessage,
    };
  }

  async deleteMessage(userId: string, messageId: string) {
    return await this.messageRepo.delete({
      id: messageId,
    });
  }
}
