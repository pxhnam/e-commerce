import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import TokenService from '@modules/token/token.service';
import AppConfigService from '@modules/config/config.service';
import { JwtPayload, RequestWithCookies } from '@common/interfaces';

@Injectable()
class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    private readonly configService: AppConfigService,
    private readonly tokenService: TokenService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: RequestWithCookies) => req.cookies?._token || null
      ]),
      secretOrKey: configService.getJwtRefreshSecret(),
      passReqToCallback: true
    });
  }

  async validate(
    req: RequestWithCookies,
    payload: JwtPayload
  ): Promise<JwtPayload> {
    const { _token } = req.cookies;
    if (!_token) {
      throw new UnauthorizedException();
    }
    const match = await this.tokenService.compare(payload.sub, _token);
    if (!match) throw new UnauthorizedException();
    return payload;
  }
}

export default JwtRefreshStrategy;
