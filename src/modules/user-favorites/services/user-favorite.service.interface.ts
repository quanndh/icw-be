import { ICommonService } from 'src/modules/common/services/common.service.interface';
import { LikeDto } from 'src/modules/user-favorites/dtos/input';
import { UserFavoriteEntity } from 'src/modules/user-favorites/entities/user-favorite.entity';

export const USER_FAVORITE_SERVICE = 'USER_FAVORITE_SERVICE';

export interface IUserFavoriteService
  extends ICommonService<UserFavoriteEntity> {
  like(input: LikeDto, userId: string): Promise<boolean>;
}
