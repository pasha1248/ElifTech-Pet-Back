import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { Repository } from 'typeorm';
import { ChatEntity } from './entity/chat.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatEntity)
    private readonly chatRepo: Repository<ChatEntity>,
  ) {}

  async createChat(
    senderId: string,
    receiverId: { receiverId: string },
    res: Response,
  ) {
    const newReceiverId = receiverId.receiverId;
    console.log(newReceiverId);
    if (senderId === newReceiverId) {
      throw new HttpException(
        'You cannot send message to yourself',
        HttpStatus.BAD_REQUEST,
      );
    }
    const existingConversation = await this.chatRepo.findOne({
      where: [
        {
          senderId: senderId,
          receiverId: { id: newReceiverId },
        },
        {
          senderId: newReceiverId,
          receiverId: { id: senderId },
        },
      ],
    });
    if (existingConversation) {
      return await this.findChat(senderId, newReceiverId, res);
    }
    const newChat = this.chatRepo.create({
      senderId,
      receiverId: { id: newReceiverId },
    });

    const chatSend = await this.chatRepo.save(newChat);

    return res.status(200).send(chatSend);
  }

  async userChats(userId: string, res: Response) {
    const chats = await this.chatRepo.find({
      where: [
        {
          senderId: userId,
        },
        {
          receiverId: { id: userId },
        },
      ],
      relations: { messages: true, receiverId: true },
    });

    return res.status(200).send(chats);
  }

  async findChat(userId: string, receiverId: string, res: Response) {
    console.log(receiverId);
    return res.status(200).send(
      await this.chatRepo.findOne({
        where: [
          {
            senderId: userId,
            receiverId: { id: receiverId },
          },
          {
            senderId: receiverId,
            receiverId: { id: userId },
          },
        ],
        relations: { messages: true, receiverId: true },
      }),
    );
  }
}
