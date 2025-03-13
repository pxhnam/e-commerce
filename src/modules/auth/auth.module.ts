import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import AuthService from './auth.service';
import AuthController from './auth.controller';
import UserModule from '@modules/user/user.module';
import LocalStrategy from './passport/local.strategy';
import JwtStrategy from './passport/jwt.strategy';
import AppConfigService from '@config/config.service';
import TokenModule from '@modules/token/token.module';
import JwtRefreshStrategy from './passport/jwt-refresh.strategy';

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
