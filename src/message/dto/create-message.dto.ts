import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  senderId: string;

  @IsString()
  chatId: string;

  @IsString()
  text: string;
}
