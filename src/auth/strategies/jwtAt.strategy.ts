import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

type JwtPayload = {
  id: number;
  email: string;
  iat: number;
  exp: number;
};

@Injectable()
export class JwtAtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtAtStrategy.extractJwt,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: process.env.JWT_ACCESS_SECRET,
      passReqToCallback: true,
    });
  }
  private static extractJwt(req: Request): string | null {
    if (req.cookies && 'tokenAccess' in req.cookies) {
      return req.cookies.tokenAccess;
    }
    return null;
  }

  async validate(req: Request, payload: JwtPayload) {
    return {
      ...payload,
    };
  }
}
