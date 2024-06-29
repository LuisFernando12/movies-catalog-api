import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import User from 'src/model/user.model';
import UserService from 'src/service/user.service';
import * as bcrypt from 'bcrypt';
import { ApiTags } from '@nestjs/swagger';

@Controller('/user')
@ApiTags('User')
export default class UserController {
  constructor(private userService: UserService) {}
  private async encryptPassword(password: string) {
    return bcrypt.hashSync(password, 10);
  }
  @Post('/')
  async create(@Body() user: User): Promise<string> {
    if (
      Object.values(user).every(
        (value) => value !== undefined && value !== null,
      )
    ) {
      user.password = await this.encryptPassword(user.password);
      return await this.userService.create(user);
    }
    throw new BadRequestException();
  }
}
