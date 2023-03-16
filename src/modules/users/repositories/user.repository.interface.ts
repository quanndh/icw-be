import { ICommonRepository } from 'src/modules/common/repositories/common.repository.interface';
import { UserEntity } from 'src/modules/users/entities/user.entity';

export const USER_REPOSITORY = 'USER_REPOSITORY';

export type IUserRepository = ICommonRepository<UserEntity>;
