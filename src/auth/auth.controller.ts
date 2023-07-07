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
  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('logout')
  logout(@Res() response: Response) {
    response.clearCookie('refreshToken');
    response.clearCookie('access_token').status(204).send();
  }

  @Get('signIn')
  async signIn(
    @Body() credentialsDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { refresh_token, access_token } = await this.authService.signIn(
      credentialsDto,
    );

    response.cookie('refresh_token', refresh_token, {
      secure: true,
      httpOnly: true,
      maxAge: 3600000,
    });
    response.cookie('access_token', access_token, {
      secure: true,
      httpOnly: true,
      maxAge: 60000,
    });
    return;
  }

  @Get('test')
  test(@Req() req: Request) {
    console.log(req.cookies['access_token']);
    return 'this is test';
  }
}
