import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SubscriptionEntity } from './subscription.entity';
import { UserEntity } from './entity/user.entity';
import { onlineUserEntity } from './entity/onlineUser.entity';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      SubscriptionEntity,
      onlineUserEntity,
    ]),
  ],
})
export class UserModule {}
