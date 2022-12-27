import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Delete,
  Param,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('create')
  async createMessage(@Body() dto: CreateMessageDto, @Req() req: Request) {
    const user = req.user['user'];
    return await this.messageService.createNewMessage(user, dto);
  }

  @Delete(':id')
  async deleteMessage(@Param('id') id: string, @Req() req: Request) {
    const user = req.user['user'];
    return await this.messageService.deleteMessage(user, id);
  }
}
