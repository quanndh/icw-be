import { IsEmail, MinLength } from 'class-validator';

export class SignUpInput {
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @MinLength(6, { message: 'Password too short (more than 6 characters)' })
  password: string;
}

export class LoginInput extends SignUpInput {}
