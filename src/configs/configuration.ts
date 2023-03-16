import { UserFavoriteEntity } from 'src/modules/user-favorites/entities/user-favorite.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export default () => {
  return {
    port: Number(process.env.PORT) || 3000,
    database: {
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      synchronize: process.env.DATABASE_SYNC === 'true',
      connectTimeoutMS: 10000,
      maxQueryExecutionTime: 5000,
      logging: process.env.DATABASE_LOGGING === 'true',
      type: 'postgres',
      entities: [UserEntity, UserFavoriteEntity],
      logNotifications: true,
      namingStrategy: new SnakeNamingStrategy(),
    },
    jwt: {
      secret: process.env.SECRET,
    },
  };
};
