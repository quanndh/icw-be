import {
  BadGatewayException,
  BadRequestException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtGenerateOption, Payload } from 'src/modules/auth/auth.interface';
import { LoginInput, SignUpInput } from 'src/modules/auth/dtos/auth.input';
import { IAuthService } from 'src/modules/auth/services/auth.service.interface';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import {
  IUserService,
  USER_SERVICE,
} from 'src/modules/users/services/user.service.interface';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {
  AuthorizedPayload,
  TokenInfo,
} from 'src/modules/auth/dtos/auth.response';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: IUserService,
    private readonly jwtService: JwtService,
  ) {}

  signUp = async (input: SignUpInput) => {
    try {
      const { password, ...rest } = input;

      const exist = await this.userService.findOne({
        where: { email: rest.email },
      });

      if (exist) throw new BadRequestException('This email is taken');

      const salt = await bcrypt.genSalt();
      const hashPassword = bcrypt.hashSync(password, salt);

      const user = await this.userService.create({
        ...rest,
        password: hashPassword,
        passwordSalt: salt,
      });
      delete user.password;
      delete user.passwordSalt;
      return user;
    } catch (error: any) {
      throw new BadGatewayException(error.message);
    }
  };

  refreshToken = async (user: UserEntity) => {
    const authToken = this.saveAuthToken(user.id, user.email, {
      issuer: 'frontend',
      audience: ['app'],
    });
    if (!authToken) {
      throw new Error('Error');
    }

    delete user.password;
    delete user.passwordSalt;

    return {
      user,
      accessToken: authToken?.accessToken,
      refreshToken: authToken?.refreshToken,
    };
  };

  login = async (input: LoginInput): Promise<AuthorizedPayload> => {
    try {
      const { email, password } = input;

      const user = await this.validateUser(email, password);

      const authToken = this.saveAuthToken(user.id, user.email, {
        issuer: 'frontend',
        audience: ['app'],
      });
      if (!authToken) {
        throw new BadRequestException('Error');
      }

      delete user.password;
      delete user.passwordSalt;

      return {
        user,
        accessToken: authToken?.accessToken,
        refreshToken: authToken?.refreshToken,
      };
    } catch (error: any) {
      throw new BadGatewayException(error.message);
    }
  };

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOne({ where: { email } });
    if (!user || !bcrypt.compareSync(password, user.password ?? '')) {
      throw new Error('Your email or password is incorrect');
    }

    return user;
  }

  saveAuthToken(userId: string, email: string, options?: JwtGenerateOption) {
    const { accessToken, refreshToken } = this.initAccessToken({
      payload: {
        sub: userId,
        email,
      },
      options,
    });
    return { accessToken, refreshToken };
  }

  initAccessToken(data: {
    payload: Payload;
    options?: JwtGenerateOption;
  }): TokenInfo {
    const { payload, options } = data;
    return {
      accessToken: this.jwtService.sign(payload, {
        ...options,
        expiresIn: `3 days`,
      }),
      refreshToken: this.jwtService.sign(payload, {
        ...options,
        expiresIn: `15 days`,
      }),
    };
  }
}
