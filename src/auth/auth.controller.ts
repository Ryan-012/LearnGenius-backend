import { Body, Controller, Get } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  @Get('test')
  test(@Body() createUserDto: CreateUserDto) {
    return 'test';
  }
}
