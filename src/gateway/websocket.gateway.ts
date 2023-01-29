import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';
import { onlineUserEntity } from 'src/user/entity/onlineUser.entity';
import { Repository } from 'typeorm';
import { WebsocketService } from './websocket.service';

let activeUser = [];

@WebSocketGateway({
  cors: {
    origin: {
      cors: { origin: '*' },
      path: process.env.REACT_APP_WEBSOCKET_URL_PATH,
    },
  },
})
export class MessagingGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly websocketService: WebsocketService) {}

  handleConnection(client: Socket, ...args: any[]) {
    client.emit('client connected');
  }

  async handleDisconnect(client: Socket) {
    console.log(client.id);
    await this.websocketService.offlineUser(client.id);
  }

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('createMessage')
  handleCreateMessage(@MessageBody() data: any) {
    this.server.emit('onMessage', data);
  }

  @SubscribeMessage('newUserAdd')
  async handleEvent(@MessageBody() data, @ConnectedSocket() client: Socket) {
    console.log(client.id);

    const saveNewUser = await this.websocketService.onlineUser(data, client.id);

    // if (!activeUser.some((user) => user.userId === data)) {
    //   activeUser.push({
    //     userId: data,
    //     socketId: client.id,
    //   });
    // } else {
    //   // const arr = activeUser.find((user) => user.userId === data);
    //   // activeUser.forEach(
    //   //   (user) =>
    //   //     user.userId === data ? { ...user, socketId: client.id } : user,
    //   //   console.log('robot'),
    //   // );
    //   for (const obj of activeUser) {
    //     if (obj.userId === data) {
    //       obj.socketId = client.id;
    //     }
    //   }
    // }
    console.log(saveNewUser);
    this.server.emit('getUsers', saveNewUser);
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @MessageBody() data: { receiverId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const { receiverId } = data;
    const user = await this.websocketService.getOnlineUser(receiverId);

    if (user) {
      this.server.to(user.socketId).emit('recieveMessage', data);
    }
  }

  @SubscribeMessage('checkOnline')
  async checkOnline(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ) {
    console.log(data);
    const user = await this.websocketService.getOnlineUser(data);
    if (user) {
      console.log('online', user);
      return this.server.emit('checkOnline', true);
    }
    return this.server.emit('checkOnline', false);
  }

  @OnEvent('message.created')
  handleMessageCreated(payload: any) {
    this.server.emit('recieveMessage', payload);
  }
}
