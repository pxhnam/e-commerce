import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  getDatabase() {
    return {
      type: this.configService.get<string>('DB_CONNECTION', 'mysql') as
        | 'mysql'
        | 'postgres'
        | 'mariadb'
        | 'sqlite'
        | 'mssql'
        | 'oracle'
        | 'mongodb',
      host: this.configService.get<string>('DB_HOST', 'localhost'),
      port: this.configService.get<number>('DB_PORT', 3306),
      database: this.configService.get<string>('DB_DATABASE', 'test'),
      username: this.configService.get<string>('DB_USERNAME', 'root'),
      password: this.configService.get<string>('DB_PASSWORD', ''),
      autoLoadEntities: true,
      synchronize: true
    };
  }

  getJWT() {
    return {
      secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      signOptions: {
        expiresIn: this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRES')
      }
    };
  }

  getJwtAccessSecret(fallback = ''): string {
    return this.configService.get<string>('JWT_ACCESS_SECRET', fallback);
  }

  getJwtRefreshSecret(fallback = ''): string {
    return this.configService.get<string>('JWT_REFRESH_SECRET', fallback);
  }

  getJwtAccessTokenExpires(fallback = ''): string {
    return this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRES', fallback);
  }

  getJwtRefreshTokenExpires(fallback = ''): string {
    return this.configService.get<string>(
      'JWT_REFRESH_TOKEN_EXPIRES',
      fallback
    );
  }
}

export default AppConfigService;
