import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { RegisterGuard } from './register.guard';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(RegisterGuard)
  @Post('signUp')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Get('signIn')
  async signIn(@Body() credentialsDto: LoginDto) {
    return await this.authService.signIn(credentialsDto);
  }

  @Get('refresh-token')
  async test(@Body('refreshToken') refreshToken: string) {
    return await this.authService.generateAccessTokenFromRefreshToken(
      refreshToken,
    );
  }
}
