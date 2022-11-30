import { IsEmail, Matches, MinLength, IsString } from 'class-validator';

export class refreshPasswordDto {
  @IsEmail()
  email: string;

  @MinLength(8, { message: 'The password must be longer than 8 characters' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'The password must contain uppercase and lowercase letters',
  })
  @IsString()
  password: string;
}
