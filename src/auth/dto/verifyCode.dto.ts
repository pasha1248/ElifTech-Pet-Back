import { IsEmail, IsString } from 'class-validator';

export class verifyCodeDto {
  @IsEmail()
  email: string;

  @IsString()
  code: string;
}
