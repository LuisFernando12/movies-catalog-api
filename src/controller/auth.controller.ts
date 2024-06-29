import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import LoginDTO from 'src/dto/auth.dto';
import AuthService from 'src/service/auth.service';

@Controller('auth')
@ApiTags('Auth')
export default class AuthController {
  constructor(private autService: AuthService) {}
  @Post('/login')
  async singIn(@Body() body: LoginDTO) {
    if (body.email && body.password) {
      const { email, password } = body;
      return await this.autService.singIn({ email, password });
    }
    throw new UnauthorizedException();
  }
}
