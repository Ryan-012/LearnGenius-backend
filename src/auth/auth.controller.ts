import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
// import { Response, Request } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { RegisterGuard } from './register.guard';
import { LoginDto } from './dto/login.dto';
import { SignInGoogleDto } from './dto/sign-in-gooogle.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(RegisterGuard)
  @Post('sign-up')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('sign-in')
  async signIn(@Body() credentialsDto: LoginDto) {
    return await this.authService.signIn(credentialsDto);
  }

  @Post('sign-in-google')
  async signInGoogle(@Body() signInGoogleDto: SignInGoogleDto) {
    return await this.authService.signInGoogle(signInGoogleDto);
  }

  @Get('refresh-token/:token')
  async test(@Param('token') refreshToken: string) {
    return await this.authService.generateAccessTokenFromRefreshToken(
      refreshToken,
    );
  }
}
