import { JwtGenerateOption, Payload } from 'src/modules/auth/auth.interface';
import { LoginInput, SignUpInput } from 'src/modules/auth/dtos/auth.input';
import {
  AuthorizedPayload,
  TokenInfo,
} from 'src/modules/auth/dtos/auth.response';
import { UserEntity } from 'src/modules/users/entities/user.entity';

export const AUTH_SERVICE = 'AUTH_SERVICE';

export interface IAuthService {
  signUp(input: SignUpInput): Promise<UserEntity>;
  login(input: LoginInput): Promise<AuthorizedPayload>;
  refreshToken(user: UserEntity): Promise<AuthorizedPayload>;
  validateUser(email: string, password: string): Promise<UserEntity>;
  saveAuthToken(
    userId: string,
    email: string,
    options?: JwtGenerateOption,
  ): TokenInfo;
  initAccessToken(data: {
    payload: Payload;
    options?: JwtGenerateOption;
  }): TokenInfo;
}
