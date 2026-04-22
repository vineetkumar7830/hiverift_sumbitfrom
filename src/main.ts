// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import helmet from 'helmet';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  const port = parseInt(configService.get<string>('PORT') ?? '3000', 10);

  app.set('trust proxy', 1);
  app.use(helmet());

  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.useStaticAssets(join(__dirname, '..', 'public/uploads'), {
    prefix: '/uploads/',
  });

  app.useStaticAssets(join(__dirname, '..', 'public'));

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,           
      forbidNonWhitelisted: true,
      transform: true,           
      errorHttpStatusCode: 400,  
    }),
  );

  await app.listen(port, '0.0.0.0');
  console.log(` API running at: http://localhost:${port}/api/v1`);
}

bootstrap();
