import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhereProperty, ILike, Repository } from 'typeorm';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { CarEntity } from './entities/car.entity';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(CarEntity)
    private readonly carRepository: Repository<CarEntity>,
  ) {}

  async create(userId: string, createCarDto: CreateCarDto) {
    const newCar = this.carRepository.create({
      ...createCarDto,
      user: { id: userId },
    });
    const car = await this.carRepository.save(newCar);
    return car.id;
  }

  async findAll() {
    return `This action returns all car`;
  }

  async findOne(userId: string) {
    const car = await this.carRepository.findOne({
      where: { id: userId },
    });

    return car;
  }

  async update(id: number, updateCarDto: UpdateCarDto) {
    return `This action updates a #${id} car`;
  }

  async remove(id: number) {
    return `This action removes a #${id} car`;
  }

  async getAll(searchTerm?: string) {
    let options: FindOptionsWhereProperty<CarEntity> = {};

    if (searchTerm) {
      options = {
        name: ILike(`%${searchTerm}%`),
      };
    }

    return this.carRepository.find({
      where: {
        ...options,
      },
      order: {
        createdAt: 'DESC',
      },
      relations: {
        user: true,
        comments: {
          user: true,
        },
      },
      select: {
        user: {
          id: true,
          firstName: true,
          lastName: true,
          avatarPath: true,
        },
      },
    });
  }
}
