import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createHash } from 'crypto';
import { Token } from '@modules/database/entities';

@Injectable()
class TokenService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>
  ) {}

  find(): Promise<Token[]> {
    return this.tokenRepository.find();
  }

  async create(userId: string, token: string): Promise<Token> {
    const hashedToken = createHash('sha256').update(token).digest('hex');
    const createToken = this.tokenRepository.create({
      user: { id: userId },
      token: hashedToken
    });
    return await this.tokenRepository.save(createToken);
  }

  async compare(userId: string, token: string): Promise<boolean> {
    const hashedToken = createHash('sha256').update(token).digest('hex');
    const tokenCount = await this.tokenRepository.count({
      where: {
        user: { id: userId },
        token: hashedToken
      }
    });
    return tokenCount > 0;
  }

  async delete(token: string): Promise<boolean> {
    const hashedToken = createHash('sha256').update(token).digest('hex');
    const result = await this.tokenRepository.delete({ token: hashedToken });
    return !!(result?.affected && result.affected > 0);
  }
}

export default TokenService;
