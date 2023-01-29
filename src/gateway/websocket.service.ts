import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { onlineUserEntity } from 'src/user/entity/onlineUser.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WebsocketService {
  constructor(
    @InjectRepository(onlineUserEntity)
    private readonly onlineUserEntity: Repository<onlineUserEntity>,
  ) {}

  async onlineUser(id: string, socketId: string) {
    await this.onlineUserEntity.save({
      idOnliteUser: id,
      socketId: socketId,
    });

    return await this.onlineUserEntity.find();
  }

  async offlineUser(socketId: string) {
    return await this.onlineUserEntity.delete({ socketId: socketId });
  }

  async getOnlineUser(id: string) {
    return await this.onlineUserEntity.findOne({ where: { idOnliteUser: id } });
  }
}
