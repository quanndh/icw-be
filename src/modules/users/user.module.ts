import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/modules/users/controllers/user.controller';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { UserRepository } from 'src/modules/users/repositories/user.repository';
import { USER_REPOSITORY } from 'src/modules/users/repositories/user.repository.interface';
import { UserService } from 'src/modules/users/services/user.service';
import { USER_SERVICE } from 'src/modules/users/services/user.service.interface';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    {
      useClass: UserRepository,
      provide: USER_REPOSITORY,
    },
    {
      useClass: UserService,
      provide: USER_SERVICE,
    },
  ],
  controllers: [UserController],
  exports: [USER_SERVICE],
})
export class UserModule {}
