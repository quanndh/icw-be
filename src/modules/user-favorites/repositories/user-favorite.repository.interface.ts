import { ICommonRepository } from 'src/modules/common/repositories/common.repository.interface';
import { UserFavoriteEntity } from 'src/modules/user-favorites/entities/user-favorite.entity';

export const USER_FAVORITE_REPOSITORY = 'USER_FAVORITE_REPOSITORY';

export type IUserFavoriteRepositoty = ICommonRepository<UserFavoriteEntity>;
