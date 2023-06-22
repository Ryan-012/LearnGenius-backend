import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.body.role || request.body.role === 'STUDENT') return true;

    const authToken = request.headers['authorization'];

    if (!authToken) throw new UnauthorizedException();

    const extractedToken = authToken.split(' ')[1];

    try {
      await this.jwtService.verifyAsync(extractedToken, {
        secret: process.env.SECRET_KEY,
      });
    } catch (error) {
      console.log('test');
      throw new UnauthorizedException();
    }

    return true;
  }
}
