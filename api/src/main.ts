import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Security headers
  app.use(helmet());

  // Parse httpOnly cookies (needed for refresh token)
  app.use(cookieParser());

  // Rate limiting — protect auth endpoints from brute force
  app.use(
    '/auth/login',
    rateLimit({ windowMs: 15 * 60 * 1000, max: 10, message: 'Too many login attempts' }),
  );
  app.use(
    '/auth/refresh',
    rateLimit({ windowMs: 15 * 60 * 1000, max: 30 }),
  );

  // Activate class-validator decorators (LoginDto, etc.)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,       // strip unknown properties
      forbidNonWhitelisted: true,
      transform: true,       // auto-transform payloads to DTO class instances
    }),
  );

  // CORS — allow Angular dev server
  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true, // required for httpOnly cookies to be sent cross-origin
  });

  await app.listen(process.env['PORT'] ?? 3000);
  console.log('RetailHub API running on http://localhost:3000');
}
bootstrap();
