import {
  Controller,
  Get,
  Query,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';
import { ChatService } from './chat.service';

@UseGuards(AccessTokenGuard)
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('create')
  async createChat(
    @Query() receiverId: { receiverId: string },
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = req.user['id'];
    await this.chatService.createChat(user, receiverId, res);
  }

  @Get('getAll')
  async getAllUserChats(@Req() req: Request, @Res() res: Response) {
    const user = req.user['id'];
    await this.chatService.userChats(user, res);
  }

  @Get('getOne')
  async getOneChat(
    @Query() chatId: { chatId: string },
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const user = req.user['id'];
    const { chatId: newchatId } = chatId;
    await this.chatService.findChat(user, newchatId, res);
  }
}
