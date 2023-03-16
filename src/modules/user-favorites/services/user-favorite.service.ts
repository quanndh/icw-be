import { BadGatewayException, Inject, Injectable } from '@nestjs/common';
import { CommonService } from 'src/modules/common/services/common.service';
import { LikeDto } from 'src/modules/user-favorites/dtos/input';
import { UserFavoriteEntity } from 'src/modules/user-favorites/entities/user-favorite.entity';
import {
  IUserFavoriteRepositoty,
  USER_FAVORITE_REPOSITORY,
} from 'src/modules/user-favorites/repositories/user-favorite.repository.interface';
import { IUserFavoriteService } from 'src/modules/user-favorites/services/user-favorite.service.interface';

@Injectable()
export class UserFavoriteService
  extends CommonService<UserFavoriteEntity>
  implements IUserFavoriteService
{
  constructor(
    @Inject(USER_FAVORITE_REPOSITORY)
    private readonly userFavRepo: IUserFavoriteRepositoty,
  ) {
    super(userFavRepo);
  }

  like = async (input: LikeDto, userId: string) => {
    try {
      const userFav = await this.findOne({
        where: { userId, movieId: input.movieId },
      });
      if (userFav) {
        await this.delete(userFav.id);
      } else {
        await this.create({ userId, ...input });
      }
      return true;
    } catch (error) {
      throw new BadGatewayException(error.message);
    }
  };
}
