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

let activeUser = [];

@WebSocketGateway({
  cors: {
    origin: {
      cors: { origin: '*' },
      path: process.env.REACT_APP_WEBSOCKET_URL_PATH,
    },
  },
})
export class MessagingGateway implements OnGatewayConnection {
  handleConnection(client: Socket, ...args: any[]) {
    console.log(...args);
    client.emit('client connected');
  }

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('createMessage')
  handleCreateMessage(@MessageBody() data: any) {
    this.server.emit('onMessage', data);

    console.log('create message', data);
  }

  @SubscribeMessage('disconnect')
  hendleDiscontect(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ) {
    activeUser = activeUser.filter((user) => user.socketId !== client.id);

    console.log('disconect', activeUser);
    this.server.emit('getUsers', activeUser);
  }

  @SubscribeMessage('newUserAdd')
  handleEvent(@MessageBody() data, @ConnectedSocket() client: Socket) {
    console.log('newUserAdd', data);

    if (!activeUser.some((user) => user.userId === data)) {
      activeUser.push({
        userId: data,
        socketId: client.id,
      });
    } else {
      // const arr = activeUser.find((user) => user.userId === data);
      // activeUser.forEach(
      //   (user) =>
      //     user.userId === data ? { ...user, socketId: client.id } : user,
      //   console.log('robot'),
      // );
      for (const obj of activeUser) {
        if (obj.userId === data) {
          obj.socketId = client.id;
        }
      }
    }

    console.log('active', activeUser);
    console.log('newUserAdd', data, client.id);

    this.server.emit('getUsers', activeUser);
  }

  @SubscribeMessage('sendMessage')
  handleSendMessage(
    @MessageBody() data: { receiverId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const { receiverId } = data;
    const user = activeUser.find((user) => user.userId === receiverId);
    console.log('Sending from to ', receiverId);
    console.log('data', data);

    if (user) {
      this.server.to(user.socketId).emit('recieveMessage', data);
      console.log('done');
    }
  }

  @OnEvent('message.created')
  handleMessageCreated(payload: any) {
    this.server.emit('recieveMessage', payload);
  }
}
