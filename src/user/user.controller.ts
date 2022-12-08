import { AuthService } from './../auth/auth.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AccessTokenGuard)
  @Get('profile')
  async getProfile(@Req() req: Request) {
    const id = req.user?.['id'];
    return this.userService.byId(id);
  }

  @Get('by-id/:id')
  async getUser(@Param('id') id: string) {
    return this.userService.byId(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() dto: UserDto) {
    return this.userService.updateProfile(id, dto);
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(AccessTokenGuard)
  @HttpCode(200)
  @Patch('subscribe/:channelId')
  async subscribeToChannel(
    @Req() req: Request,
    @Param('channelId') channelId: string,
  ) {
    const id = req.user?.['id'];
    return this.userService.subscribe(id, channelId);
  }

  @Get('all')
  async getUsers() {
    return this.userService.getAll();
  }

  @Put('avatar')
  async changeAvatar(@Req() req: Request) {
    const id = req.user['id'];
    return this.changeAvatar(id);
  }
}
