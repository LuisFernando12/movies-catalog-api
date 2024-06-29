import { Injectable, UnauthorizedException } from '@nestjs/common';
import User from 'src/model/user.model';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import LoginDTO from 'src/dto/auth.dto';
import TokenService from './token.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export default class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private tokenService: TokenService,
  ) {}

  private async validatePassword(
    password: string,
    user?: User,
  ): Promise<boolean> {
    return await bcrypt.compare(password, user.password);
  }
  async singIn({ email, password }: LoginDTO) {
    const user = await this.userRepository.findOne({ where: { email: email } });
    if (!user || !(await this.validatePassword(password, user))) {
      throw new UnauthorizedException('invalid credentials');
    }
    const payload = { sub: user.id, username: user.email, name: user.name };
    const token = await this.tokenService.generateToken(payload);
    return { accessToken: token };
  }
}
