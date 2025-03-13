import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import AuthService from '@modules/auth/auth.service';
import { User } from '@entities';
import { UserStatus } from '@common/enums';

@Injectable()
class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }
  async validate(username: string, password: string): Promise<User> {
    const user = await this.authService.validateUser(username, password);
    if (!user) throw new UnauthorizedException();
    if (user.status !== UserStatus.ACTIVE) throw new UnauthorizedException();
    return user;
  }
}

export default LocalStrategy;
