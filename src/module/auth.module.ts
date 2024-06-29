import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import AuthController from 'src/controller/auth.controller';
import User from 'src/model/user.model';
import AuthService from 'src/service/auth.service';
import TokenService from 'src/service/token.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, TokenService],
})
export class AuthModule {}
