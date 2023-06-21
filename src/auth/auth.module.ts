import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AdminGuard } from './admin.guard';

@Module({
  imports: [],
  providers: [AuthService, PrismaService, AdminGuard],
  controllers: [AuthController],
})
export class AuthModule {}
