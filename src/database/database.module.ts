import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import AppConfigService from '@config/config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: AppConfigService): TypeOrmModuleOptions =>
        configService.getDatabase(),
      inject: [AppConfigService]
    })
  ]
})
class DatabaseModule {}
export default DatabaseModule;
