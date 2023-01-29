import {
  Body,
  Controller,
  Get,
  HttpCode,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { refreshPasswordDto } from './dto/refreshPassword.dto';
import { RegisterDto } from './dto/register.dto';
import { verifyCodeDto } from './dto/verifyCode.dto';
import { AccessTokenGuard } from './guards/accessToken.guard';
import { RefreshTokenGuard } from './guards/refreshToken.guard';

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

  @Post('sign-in')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.login(dto, res);
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  @HttpCode(200)
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const user = req.user['id'];

    return this.authService.logout(user, res);
  }

  @UsePipes(new ValidationPipe())
  @Post('sign-up')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  @HttpCode(200)
  async refreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { tokenRefresh } = req.cookies;
    const user = req.user['id'];

    return this.authService.refreshToken(user, tokenRefresh, res);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() dto: { email: string }) {
    return this.authService.forgotPassword(dto);
  }

  @Post('verify-code')
  async verifyCode(@Body() dto: verifyCodeDto) {
    return this.authService.verifyCode(dto);
  }

  @Patch('refresh-password')
  async changePassword(@Body() dto: refreshPasswordDto) {
    return this.authService.refreshPassword(dto);
  }

  @Post('check')
  async check(@Body() any) {
    console.log(any);
  }
}
