import { JwtPayload } from '@common/interfaces';
import AppConfigService from '@config/config.service';
import { User } from '@entities';
import UserService from '@modules/user/user.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly configService: AppConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getJwtAccessSecret()
    });
  }

  async validate(payload: JwtPayload): Promise<User | null> {
    const user = await this.userService.findById(payload.sub);
    return user;
  }
}

export default JwtStrategy;
