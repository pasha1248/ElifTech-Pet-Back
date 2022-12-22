import { UserDto } from './user.dto';
import { SubscriptionEntity } from './subscription.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { genSalt, hash } from 'bcryptjs';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(SubscriptionEntity)
    private readonly subscriptionEntity: Repository<SubscriptionEntity>,
  ) {}

  // by-id
  async byId(id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },

      relations: {
        articles: true,
        subscriptions: {
          toChannel: true,
        },
        cars: { photosPath: true },
      },

      order: {
        createdAt: 'DESC',
      },
    });
    if (!user) throw new NotFoundException('user Is not Found');
    return user;
  }

  //update
  async updateProfile(id: string, dto: UserDto) {
    const user = await this.byId(id);

    const isSameUser = await this.userRepository.findOneBy({
      email: dto.email,
    });
    if (isSameUser && id !== isSameUser.id)
      throw new BadRequestException('Email is busy');

    if (dto.password) {
      const salt = await genSalt(4);
      user.password = await hash(dto.password, salt);
    }

    user.email = dto.email;
    user.firstName = dto.firstName;
    user.lastName = dto.lastName;
    user.description = dto.description;
    user.avatarPath = dto.avatarPath;
    return this.userRepository.save(user);
  }

  //subscribe
  async subscribe(id: string, channeId: string) {
    const data = {
      toChannel: { id: channeId },
      fromUser: { id },
    };
    const isSubscribed = await this.subscriptionEntity.findOneBy(data);
    if (!isSubscribed) {
      const newSubscription = await this.subscriptionEntity.create(data);
      await this.subscriptionEntity.save(newSubscription);
      return true;
    }

    await this.subscriptionEntity.delete(data);
    return false;
  }

  //getAll
  async getAll() {
    return this.userRepository.find();
  }

  async chagneAvatar(id) {
    const user = await this.byId(id);
  }
}
