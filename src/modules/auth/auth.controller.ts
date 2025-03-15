import {
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UnauthorizedException,
  UseGuards
} from '@nestjs/common';
import AuthService from './auth.service';
import LocalAuthGuard from './guards/local-auth.guard';
import JwtAuthGuard from './guards/jwt-auth.guard';
import RefreshTokenGuard from './guards/refresh-token.guard';
import { Request } from 'express';
import { User } from '@modules/database/entities';
import { JwtPayload } from '@common/interfaces';

@Controller('auth')
class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signUp() {
    return 'Sign Up';
  }

  @Post('sign-in')
  @UseGuards(LocalAuthGuard)
  signIn(@Req() request: Request) {
    return this.authService.signIn(request.user as User);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  profile(@Req() request: Request) {
    return request.user;
  }

  @Post('refresh-token')
  @UseGuards(RefreshTokenGuard)
  refreshToken(@Req() request: Request) {
    return {
      accessToken: this.authService.signAccessToken(request.user as JwtPayload)
    };
  }

  @Post('sign-out')
  @HttpCode(200)
  async signOut(@Req() request: Request) {
    const { _token } = request.cookies;
    if (typeof _token !== 'string') throw new UnauthorizedException();
    const isDeleted = await this.authService.signOut(_token);
    if (!isDeleted) throw new UnauthorizedException();
    return { message: 'Sign out successful' };
  }
}

export default AuthController;
