import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@modules/database/entities';
import BaseService from '@modules/base/base.service';

@Injectable()
class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {
    super(userRepository);
  }

  findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOneBy({ username });
  }

  async findWithSensitive(identifier: string | number): Promise<User | null> {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :identifier OR user.username = :identifier', {
        identifier
      })
      .addSelect(['user.password'])
      .getOne();
  }
}

export default UserService;
