import { UserEntity } from 'src/modules/users/entities/user.entity';

export class TokenInfo {
  accessToken: string;
  refreshToken: string;
}

export class AuthorizedPayload extends TokenInfo {
  user: UserEntity;
}
