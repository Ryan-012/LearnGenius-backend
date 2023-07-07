import { Controller, Get } from '@nestjs/common';

@Controller('authorization')
export class AuthorizationController {
  @Get()
  async protectedRouteHandler() {
    return true;
  }
}
