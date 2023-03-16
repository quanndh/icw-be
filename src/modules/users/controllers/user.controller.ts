import { Controller, Get, Inject } from '@nestjs/common';
import { Authenticated, CurrentUser } from 'src/decorators/common.decorator';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import {
  IUserService,
  USER_SERVICE,
} from 'src/modules/users/services/user.service.interface';

@Controller('users')
export class UserController {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: IUserService,
  ) {}

  @Authenticated()
  @Get('/me')
  async me(@CurrentUser() user: UserEntity) {
    delete user.password;
    delete user.passwordSalt;
    return user;
  }
}
