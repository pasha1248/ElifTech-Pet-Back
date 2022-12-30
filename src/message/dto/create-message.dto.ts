import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  chatId: string;

  @IsString()
  senderId: string;

  @IsString()
  text: string;
}
