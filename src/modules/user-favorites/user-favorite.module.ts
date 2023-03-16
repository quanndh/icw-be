import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserFavoriteController } from 'src/modules/user-favorites/controllers/user-favorite.controller';
import { UserFavoriteEntity } from 'src/modules/user-favorites/entities/user-favorite.entity';
import { UserFavoriteRepository } from 'src/modules/user-favorites/repositories/user-favorite.repository';
import { USER_FAVORITE_REPOSITORY } from 'src/modules/user-favorites/repositories/user-favorite.repository.interface';
import { UserFavoriteService } from 'src/modules/user-favorites/services/user-favorite.service';
import { USER_FAVORITE_SERVICE } from 'src/modules/user-favorites/services/user-favorite.service.interface';

@Module({
  imports: [TypeOrmModule.forFeature([UserFavoriteEntity])],
  providers: [
    { useClass: UserFavoriteRepository, provide: USER_FAVORITE_REPOSITORY },
    { useClass: UserFavoriteService, provide: USER_FAVORITE_SERVICE },
  ],
  controllers: [UserFavoriteController],
})
export class UserFavoriteModule {}
