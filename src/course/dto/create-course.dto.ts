import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  category: string;

  @IsString()
  description: string;

  @IsString()
  level: string;

  @IsString()
  name: string;

  @IsString()
  plan: string;

  @IsString()
  uploadDataPhoto?: string;

  @IsString()
  uploadDataVideo?: string;

  @IsString()
  questions: string;
}
