import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageService } from './message.service';

@UseGuards(AccessTokenGuard)
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('create')
  async createMessage(@Body() dto: CreateMessageDto, @Req() req: Request) {
    const user = req.user['id'];
    return await this.messageService.createNewMessage(user, dto);
  }

  @Delete(':id')
  async deleteMessage(@Param('id') id: string, @Req() req: Request) {
    const user = req.user['id'];
    return await this.messageService.deleteMessage(user, id);
  }
}
