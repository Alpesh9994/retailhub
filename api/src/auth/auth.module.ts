import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        // getOrThrow throws at startup if the env var is missing — fail-fast behaviour
        secret: config.getOrThrow<string>('JWT_ACCESS_SECRET'),
        signOptions: {
          // Cast required: ms library's StringValue branded type is incompatible with plain string
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          expiresIn: config.getOrThrow<string>('JWT_ACCESS_EXPIRES_IN') as any,
        },
      }),
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
