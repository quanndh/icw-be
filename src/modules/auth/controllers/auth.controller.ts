import {
  BadGatewayException,
  Body,
  Controller,
  Inject,
  Post,
} from '@nestjs/common';
import { Authenticated, CurrentUser } from 'src/decorators/common.decorator';
import { LoginInput, SignUpInput } from 'src/modules/auth/dtos/auth.input';
import {
  AUTH_SERVICE,
  IAuthService,
} from 'src/modules/auth/services/auth.service.interface';
import { UserEntity } from 'src/modules/users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AUTH_SERVICE) private readonly authService: IAuthService,
  ) {}

  @Post('/signup')
  signup(@Body() input: SignUpInput) {
    try {
      return this.authService.signUp(input);
    } catch (error) {
      throw new BadGatewayException();
    }
  }

  @Post('/login')
  login(@Body() input: LoginInput) {
    return this.authService.login(input);
  }

  @Authenticated()
  @Post('refresh-token')
  refreshToken(@CurrentUser() user: UserEntity) {
    return this.authService.refreshToken(user);
  }
}
