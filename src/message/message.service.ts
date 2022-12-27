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
    if (userId !== dto.senderId) {
      throw new HttpException('No access', HttpStatus.BAD_REQUEST);
    }

    const newMessage = this.messageRepo.create(dto);

    return await this.messageRepo.save(dto);
  }

  async deleteMessage(userId: string, messageId: string) {
    return await this.messageRepo.delete({
      id: messageId,
      chatOwner: { senderId: userId },
    });
  }
}
