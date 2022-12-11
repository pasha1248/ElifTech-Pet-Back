import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarEntity } from './entities/car.entity';

@Module({
  controllers: [CarController],
  providers: [CarService],
  imports: [TypeOrmModule.forFeature([CarEntity])],
})
export class CarModule {}
