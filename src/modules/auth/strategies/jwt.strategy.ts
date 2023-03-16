import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import jwtDecode from 'jwt-decode';
import { JWTDecodeValue } from 'src/modules/auth/auth.interface';
import {
  IUserService,
  USER_SERVICE,
} from 'src/modules/users/services/user.service.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: IUserService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: (req: Request) => {
        return (
          (req?.cookies?.token as string) ??
          req?.headers?.authorization?.split(' ')[1] ??
          req?.query?.access_token
        );
      },
      secretOrKey: configService.get('jwt.secret'),
      passReqToCallback: true,
    });
  }

  validate = async (req: Request) => {
    const accessToken = req.headers.authorization?.split(' ')[1];
    if (!accessToken) {
      throw new UnauthorizedException();
    }
    try {
      const user = await this.getUserByToken(accessToken);
      if (!user) {
        throw new UnauthorizedException('Invalid token');
      }
      return user;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  };

  async getUserByToken(token: string) {
    const { email } = jwtDecode<JWTDecodeValue>(token);
    try {
      const user = await this.userService.findOne({ where: { email } });
      return user;
    } catch (error) {
      return null;
    }
  }
}
