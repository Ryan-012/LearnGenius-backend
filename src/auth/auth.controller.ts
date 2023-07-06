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
  logout(@Res() res: Response) {
    res.clearCookie('access_token').status(204).send();
  }

  @Get('signIn')
  signIn(
    @Body() credentialsDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    res.cookie('access_token', 'test');
    res.cookie('refresh_token', 'test2');
    return this.authService.signIn(credentialsDto);
  }

  @Get('test')
  test(@Req() req: Request) {
    console.log(req.cookies['access_token']);
    return 'this is test';
  }
}
