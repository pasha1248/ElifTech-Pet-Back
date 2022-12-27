import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from './message.entity';

@Module({
  controllers: [MessageController],
  providers: [MessageService],
  imports: [TypeOrmModule.forFeature([MessageEntity])],
})
export class MessageModule {}
