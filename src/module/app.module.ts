import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import MovieEntity from 'src/model/movie.model';
import User from 'src/model/user.model';
import { UserModule } from './user.module';
import { MovieModule } from './movie.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 5433,
      username: process.env.USER_DB,
      password: process.env.PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, MovieEntity],
      synchronize: true,
    }),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: '1d' },
      global: true,
    }),
    UserModule,
    MovieModule,
    AuthModule,
  ],
})
export class AppModule {}
