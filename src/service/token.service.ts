import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
interface IPayloadJwt {
  sub: number;
  username: string;
  name: string;
}
@Injectable()
export default class TokenService {
  constructor(private jwtService: JwtService) {}
  async generateToken(payload: IPayloadJwt): Promise<string> {
    if (
      Object.values(payload).every(
        (value) => value !== undefined && value !== null,
      )
    ) {
      return await this.jwtService.signAsync(payload);
    } else {
      throw new InternalServerErrorException('Invalid payload');
    }
  }
}
