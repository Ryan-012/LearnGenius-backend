import { Module } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { JwtService } from '@nestjs/jwt';
import { AuthorizationController } from './authorization.controller';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [],
  controllers: [AuthorizationController],
  providers: [AuthorizationService, JwtService, AuthService],
})
export class AuthorizationModule {}
