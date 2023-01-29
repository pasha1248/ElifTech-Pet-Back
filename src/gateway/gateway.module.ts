import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { onlineUserEntity } from 'src/user/entity/onlineUser.entity';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { MessagingGateway } from './websocket.gateway';
import { WebsocketService } from './websocket.service';

@Module({
  providers: [MessagingGateway, WebsocketService],
  imports: [TypeOrmModule.forFeature([onlineUserEntity])],
})
export class GatewayModule {}
