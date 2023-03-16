import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonRepository } from 'src/modules/common/repositories/common.repository';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { IUserRepository } from 'src/modules/users/repositories/user.repository.interface';

@Injectable()
export class UserRepository
  extends CommonRepository<UserEntity>
  implements IUserRepository
{
  constructor(@InjectRepository(UserEntity) userRepository: UserRepository) {
    super(userRepository);
  }
}
