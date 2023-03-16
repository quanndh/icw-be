import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/guards/rest-auth.guard';
import { UserEntity } from 'src/modules/users/entities/user.entity';

export interface AuthorizedRequest extends Request {
  user: UserEntity;
}

export const CurrentUser = createParamDecorator<
  keyof UserEntity,
  ExecutionContext,
  any
>((field, ctx) => {
  const request = ctx.switchToHttp().getRequest<AuthorizedRequest>();
  return request.user;
});

export const Authenticated = () => {
  return applyDecorators(UseGuards(JwtAuthGuard));
};
