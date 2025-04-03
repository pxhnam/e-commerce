import CurrentUser from '@common/decorators/current-user.decorator';
import {
  JwtPayload,
  RequestWithCookies,
  RequestWithUser
} from '@common/interfaces';
import { User } from '@modules/database/entities';
import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { Request } from 'express';
import AuthService from './auth.service';
import JwtAuthGuard from './guards/jwt-auth.guard';
import LocalAuthGuard from './guards/local-auth.guard';
import RefreshTokenGuard from './guards/refresh-token.guard';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signUp() {
    return this.authService.signUp();
  }

  @Post('sign-in')
  @UseGuards(LocalAuthGuard)
  signIn(@Req() request: RequestWithUser) {
    return this.authService.signIn(request.user);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  profile(@CurrentUser() user: User) {
    return user;
  }

  @Post('refresh-token')
  @UseGuards(RefreshTokenGuard)
  refreshToken(@Req() request: Request) {
    return {
      accessToken: this.authService.signAccessToken(request.user as JwtPayload)
    };
  }

  @Post('sign-out')
  signOut(@Req() request: RequestWithCookies) {
    const { _token } = request.cookies;
    return this.authService.signOut(_token);
  }
}

export default AuthController;
