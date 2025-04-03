import { UserStatus } from '@common/enums';
import { JwtPayload } from '@common/interfaces';
import AppConfigService from '@modules/config/config.service';
import { User } from '@modules/database/entities';
import TokenService from '@modules/token/token.service';
import UserService from '@modules/user/user.service';
import {
  HttpException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: AppConfigService
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userService.findByUsername(username);
    const match = await user.comparePassword(password);
    if (!match) throw new UnauthorizedException();
    if (user.status !== UserStatus.ACTIVE) throw new UnauthorizedException();
    return user;
  }

  signUp() {}

  async signIn(user: User) {
    const payload = { sub: user.id, username: user.username, role: user.role };
    const accessToken = this.signAccessToken(payload);
    const refreshToken = this.signRefreshToken(payload);
    await this.tokenService.create(user.id, refreshToken);
    return { information: payload, accessToken, refreshToken };
  }

  signAccessToken(payload: JwtPayload) {
    const data = this.handlePayload(payload);
    return this.jwtService.sign(data);
  }

  signRefreshToken(payload: JwtPayload) {
    const data = this.handlePayload(payload);
    return this.jwtService.sign(data, {
      secret: this.configService.getJwtRefreshSecret(),
      expiresIn: this.configService.getJwtRefreshTokenExpires()
    });
  }

  handlePayload(payload: Record<string, any>) {
    delete payload['exp'];
    delete payload['iat'];
    return payload;
  }

  async signOut(token: string | undefined) {
    if (!token) throw new UnauthorizedException();
    const isDeleted = await this.tokenService.deleteByToken(token);
    if (!isDeleted) throw new UnauthorizedException();
    throw new HttpException('OK', 200);
  }
}

export default AuthService;
