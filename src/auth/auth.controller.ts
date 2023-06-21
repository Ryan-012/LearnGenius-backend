import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { AdminGuard } from './admin.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AdminGuard)
  @Get('test')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register();
  }
}
