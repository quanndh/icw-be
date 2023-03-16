import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonRepository } from 'src/modules/common/repositories/common.repository';
import { UserFavoriteEntity } from 'src/modules/user-favorites/entities/user-favorite.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserFavoriteRepository extends CommonRepository<UserFavoriteEntity> {
  constructor(
    @InjectRepository(UserFavoriteEntity)
    private readonly userFavRepo: Repository<UserFavoriteEntity>,
  ) {
    super(userFavRepo);
  }
}
