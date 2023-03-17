import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from 'src/configs/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/modules/common/common.module';
import { UserModule } from 'src/modules/users/user.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { UserFavoriteModule } from 'src/modules/user-favorites/user-favorite.module';
import { AppController } from 'src/app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.development', '.env.production'],
      expandVariables: true,
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return configService.get('database');
      },
      inject: [ConfigService],
    }),
    CommonModule,
    AuthModule,
    UserModule,
    UserFavoriteModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
