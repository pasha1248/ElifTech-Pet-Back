import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('google/auth')
  async googleTest(
    @Body('token') token: string,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.authGoogle(token, res);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  // @Post('login/verify')
  // async loginAuthWithCode(
  //   @Body() dto: LoginDto,
  //   @Res({ passthrough: true }) res: Response,
  // ) {
  //   return this.authService.loginAuthWithCode(dto, res);
  // }

  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  // @UseGuards(AccessTokenGuard)
  // @Post('logout')
  // @HttpCode(200)
  // async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
  //   const user = req.user['id'];

  //   return this.authService.logout(user, res);
  // }
}
