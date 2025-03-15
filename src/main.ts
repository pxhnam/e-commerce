import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import { useContainer } from 'class-validator';
import { AppModule } from '@modules/app/app.module';
import { CustomValidationPipe } from '@pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new CustomValidationPipe());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  const PORT = configService.get<number>('PORT', 3000);
  await app.listen(PORT);
}
void bootstrap();
