import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from 'src/modules/auth/controllers/auth.controller';
import { AuthService } from 'src/modules/auth/services/auth.service';
import { AUTH_SERVICE } from 'src/modules/auth/services/auth.service.interface';
import { JwtStrategy } from 'src/modules/auth/strategies/jwt.strategy';
import { UserModule } from 'src/modules/users/user.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    forwardRef(() => UserModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('jwt.secret'),
          signOptions: { expiresIn: '30 days', issuer: 'frontend' },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [JwtStrategy, { useClass: AuthService, provide: AUTH_SERVICE }],
  controllers: [AuthController],
})
export class AuthModule {}
