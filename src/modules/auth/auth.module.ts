import AppConfigService from '@modules/config/config.service';
import TokenModule from '@modules/token/token.module';
import UserModule from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import AuthController from './auth.controller';
import AuthService from './auth.service';
import JwtRefreshStrategy from './passport/jwt-refresh.strategy';
import JwtStrategy from './passport/jwt.strategy';
import LocalStrategy from './passport/local.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: AppConfigService) => configService.getJWT(),
      inject: [AppConfigService]
    }),
    PassportModule,
    UserModule,
    TokenModule
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshStrategy],
  controllers: [AuthController]
})
class AuthModule {}
export default AuthModule;
