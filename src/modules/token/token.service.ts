import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { createHash } from 'crypto';
import { Token } from '@modules/database/entities';

@Injectable()
class TokenService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>
  ) {}

  count(conditions: FindOptionsWhere<Token>): Promise<number> {
    return this.tokenRepository.count({ where: conditions });
  }

  async exists(conditions: FindOptionsWhere<Token>): Promise<boolean> {
    const count = await this.count(conditions);
    return count > 0;
  }

  create(userId: string, token: string): Promise<Token> {
    const hashedToken = createHash('sha256').update(token).digest('hex');
    const entity = this.tokenRepository.create({
      user: { id: userId },
      token: hashedToken
    });
    return this.tokenRepository.save(entity);
  }

  compare(userId: string, token: string): Promise<boolean> {
    const hashedToken = createHash('sha256').update(token).digest('hex');
    return this.exists({ user: { id: userId }, token: hashedToken });
  }

  async deleteByToken(token: string): Promise<boolean> {
    const hashedToken = createHash('sha256').update(token).digest('hex');
    const result = await this.tokenRepository.delete({ token: hashedToken });
    return !!(result?.affected && result.affected > 0);
  }
}

export default TokenService;
