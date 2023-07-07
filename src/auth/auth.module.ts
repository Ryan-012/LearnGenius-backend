import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterGuard } from './register.guard';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthorizationService } from 'src/authorization/authorization.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET_KEY'),
        signOptions: {
          expiresIn: '60s',
        },
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [
    AuthService,
    PrismaService,
    RegisterGuard,
    JwtService,
    AuthorizationService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
