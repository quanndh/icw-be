import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { Authenticated, CurrentUser } from 'src/decorators/common.decorator';
import { LikeDto } from 'src/modules/user-favorites/dtos/input';
import {
  IUserFavoriteService,
  USER_FAVORITE_SERVICE,
} from 'src/modules/user-favorites/services/user-favorite.service.interface';
import { UserEntity } from 'src/modules/users/entities/user.entity';

@Controller('/favorite')
export class UserFavoriteController {
  constructor(
    @Inject(USER_FAVORITE_SERVICE)
    private readonly userFavService: IUserFavoriteService,
  ) {}

  @Authenticated()
  @Get()
  async myFavorite(@CurrentUser() user: UserEntity) {
    // Due to the fact that I need something indentify if I was liked a movie before I will resue this
    // It could be cached later

    // const [items, total] = await this.userFavService.findAndCount({
    //   where: { userId: user.id },
    //   take: limit,
    //   skip: (page - 1) * limit,
    // });
    // return createPaginationObject(items, total, page, limit);

    return this.userFavService.findAll({
      where: { userId: user.id },
      order: { createdAt: 'DESC' },
    });
  }

  @Authenticated()
  @Post('/like')
  like(@Body() body: LikeDto, @CurrentUser() user: UserEntity) {
    return this.userFavService.like(body, user.id);
  }
}
