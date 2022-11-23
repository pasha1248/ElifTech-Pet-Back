import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entity/user.entity';
import { RegisterDto } from './dto/register.dto';
import { Repository } from 'typeorm';
import { compare, genSalt, getSalt, hash } from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async authGoogle(token: string, res: Response) {
    const verifyUser = await this.verifyGoogleUser(token);

    if (!verifyUser) {
      throw new BadRequestException('User not found');
    }

    const userData = await this.userRepository.findOneBy({
      email: verifyUser['email'],
    });

    if (userData) {
      const tokens = await this.getTokens(userData.id, userData.email);
      await this.updateRt(userData.id, tokens.refresh_token);

      res.cookie('tokenRefresh', tokens.refresh_token, {
        maxAge: Number(process.env.MAX_AGE_COOKIE_TOKEN),
        httpOnly: true,
      });

      return {
        user: userData,
        tokens: tokens,
      };
    }
    if (!userData) {
      const newUser = await this.userRepository.create({
        email: verifyUser.email,
        firstName: verifyUser.firstName,
        lastName: verifyUser.lastName,
        avatarPath: verifyUser.avatarPath,
        password: 'email',
        refreshTokenHash: ' ',
        isVerified: true,
      });

      const userCreate = await this.userRepository.save(newUser);

      const tokens = await this.getTokens(newUser['id'], newUser['email']);
      await this.updateRt(newUser.id, tokens.refresh_token);

      res.cookie('tokenRefresh', tokens.refresh_token, {
        maxAge: Number(process.env.MAX_AGE_COOKIE_TOKEN),
        httpOnly: true,
      });
      return {
        user: userCreate,
        tokens,
      };
    }
  }

  async verifyGoogleUser(token: string) {
    const client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
    );
    const userDataGoogle = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email, picture, given_name, family_name } =
      userDataGoogle.getPayload();

    const user = {
      email: email,
      firstName: given_name,
      lastName: family_name,
      avatarPath: picture,
    };
    return user;
  }

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto);
    return {
      user: user,
      accessToken: user.id,
    };
  }

  async register(dto: RegisterDto) {
    const oldUser = await this.userRepository.findOneBy({ email: dto.email });

    if (oldUser) {
      throw new BadRequestException('Email already exists');
    }
    const salt = await genSalt(3);
    const newUser = await this.userRepository.create({
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      password: await hash(dto.password, salt),
      refreshTokenHash: ' ',
    });

    const tokens = await this.getTokens(newUser.id, newUser.email);

    const user = await this.userRepository.save(newUser);
    await this.updateRt(newUser.id, tokens.refresh_token);

    return {
      user,
      tokens,
    };
  }

  async validateUser(dto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: {
        email: dto.email,
      },
      select: ['id', 'email', 'password'],
    });

    if (!user) throw new NotFoundException('Users is not found');

    const isValidPassword = await compare(dto.password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException(
        'Your password or email is wrong, try again please',
      );
    }

    return user;
  }

  async getTokens(userId: string, email: string) {
    const data = {
      id: userId,
      email,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(data, {
        expiresIn: process.env.MAX_AGE_ACCESS_TOKEN,
        secret: process.env.JWT_SECRET,
      }),

      this.jwtService.signAsync(data, {
        expiresIn: process.env.MAX_AGE_REFRESH_TOKEN,
        secret: process.env.JWT_REFRESH_SECRET,
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async updateRt(userId: string, rt: string) {
    const salt = await genSalt(3);
    const rtHash = await hash(rt, salt);
    const user = await this.userRepository.findOne({ where: { id: userId } });
    user.refreshTokenHash = rtHash;

    await this.userRepository.save(user);

    return user.refreshTokenHash;
  }
}
