import { IsEmail, IsString, Matches, MinLength } from 'class-validator';
import { REGEX } from '../const/regexp';

export class LoginDto {
  @IsEmail()
  email: string;

  @MinLength(8, { message: 'The password must be longer than 8 characters' })
  @Matches(REGEX.PASSWORD_RULE, {
    message: 'The password must contain uppercase and lowercase letters',
  })
  @IsString()
  password: string;
}
