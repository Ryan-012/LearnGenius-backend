import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterGuard } from './register.guard';
import { JwtService } from '@nestjs/jwt';
// import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthorizationService } from 'src/authorization/authorization.service';

@Module({
  imports: [],
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
