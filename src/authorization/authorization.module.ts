import { Module } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [AuthorizationService, JwtService],
})
export class AuthorizationModule {}
