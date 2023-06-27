import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterGuard } from './register.guard';
import { JwtService, JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,

      signOptions: {
        expiresIn: '6s',
      },
    }),
  ],
  providers: [AuthService, PrismaService, RegisterGuard, JwtService],
  controllers: [AuthController],
})
export class AuthModule {}
