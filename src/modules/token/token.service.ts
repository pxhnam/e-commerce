import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createHash } from 'crypto';
import { Token } from '@modules/database/entities';
import BaseService from '@modules/base/base.service';

@Injectable()
class TokenService extends BaseService<Token> {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>
  ) {
    super(tokenRepository);
  }

  create(userId: string, token: string): Promise<Token> {
    const hashedToken = createHash('sha256').update(token).digest('hex');
    return this.add({ user: { id: userId }, token: hashedToken });
  }

  compare(userId: string, token: string): Promise<boolean> {
    const hashedToken = createHash('sha256').update(token).digest('hex');
    return this.exists({ user: { id: userId }, token: hashedToken });
  }

  async softDeleteByToken(token: string): Promise<boolean> {
    const hashedToken = createHash('sha256').update(token).digest('hex');
    return this.softDeleteBy({ token: hashedToken });
  }
}

export default TokenService;
