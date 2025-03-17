import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import UserService from '@modules/user/user.service';
import TokenService from '@modules/token/token.service';
import AppConfigService from '@modules/config/config.service';
import { User } from '@modules/database/entities';
import { JwtPayload } from '@common/interfaces';

@Injectable()
class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly jwtService: JwtService,
    private readonly configService: AppConfigService
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userService.findWithSensitive(username);
    if (!user) return null;
    const match = await user.comparePassword(password);
    if (!match) return null;
    return user;
  }

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

  async signOut(token: string) {
    return await this.tokenService.softDeleteByToken(token);
  }
}

export default AuthService;
