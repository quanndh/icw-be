import { ICommonService } from 'src/modules/common/services/common.service.interface';
import { UserEntity } from 'src/modules/users/entities/user.entity';

export const USER_SERVICE = 'USER_SERVICE';

export type IUserService = ICommonService<UserEntity>;
