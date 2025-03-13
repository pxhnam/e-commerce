import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@entities';

@Injectable()
class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  find(): Promise<User[]> {
    return this.userRepository.find();
  }

  findById(id: string): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOneBy({ username });
  }

  findByUsernameWithDeleted(username: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { username },
      withDeleted: true
    });
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

  create(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  async update(id: string, userData: Partial<User>): Promise<User | null> {
    await this.userRepository.update(id, userData);
    return this.userRepository.findOneBy({ id });
  }

  delete(id: string) {
    return this.userRepository.softDelete({ id });
  }
}

export default UserService;
