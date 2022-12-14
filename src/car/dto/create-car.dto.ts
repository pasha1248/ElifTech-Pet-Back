import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateCarDto {
  @IsString()
  name: string;

  @IsString()
  model: string;

  @IsString()
  description: string;

  @IsString()
  type: string;

  @IsString()
  photoPath: string[];

  @IsString()
  yearOfPurchase: string;

  @IsString()
  year: string;

  @IsString()
  color: string;

  @IsBoolean()
  pastCar: boolean;

  @IsString()
  brand: string;

  @IsString()
  engineCapacityLiters: string;

  @IsNumber()
  distance: string;

  @IsString()
  motor: string;

  @IsString()
  driveUnit: string;

  @IsString()
  mileage: string;
}
