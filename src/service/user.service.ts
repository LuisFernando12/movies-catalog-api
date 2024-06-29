import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/model/user.model';
import { Repository } from 'typeorm';

@Injectable()
export default class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(user: User): Promise<string> {
    const userDB = await this.userRepository.save(user);
    if (userDB) {
      return 'ok';
    }
    throw new InternalServerErrorException();
  }
}
