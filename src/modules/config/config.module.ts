import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import AppConfigService from './config.service';

@Global()
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  providers: [ConfigService, AppConfigService],
  exports: [ConfigService, AppConfigService]
})
class AppConfigModule {}
export default AppConfigModule;
