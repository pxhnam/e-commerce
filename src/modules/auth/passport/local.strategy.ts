import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import AuthService from '@modules/auth/auth.service';
import { User } from '@modules/database/entities';

@Injectable()
class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }
  validate(username: string, password: string): Promise<User> {
    return this.authService.validateUser(username, password);
  }
}

export default LocalStrategy;
