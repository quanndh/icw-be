import { Inject, Injectable } from '@nestjs/common';
import { CommonService } from 'src/modules/common/services/common.service';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import {
  IUserRepository,
  USER_REPOSITORY,
} from 'src/modules/users/repositories/user.repository.interface';
import { IUserService } from 'src/modules/users/services/user.service.interface';

@Injectable()
export class UserService
  extends CommonService<UserEntity>
  implements IUserService
{
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
  ) {
    super(userRepository);
  }
}
