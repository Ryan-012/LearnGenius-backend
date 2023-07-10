import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RegisterGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.body.role || request.body.role === 'STUDENT') return true;

    const authToken = request.headers['authorization'];

    if (!authToken)
      throw new UnauthorizedException('Authentication token is required');

    const extractedToken = authToken.split(' ')[1];

    try {
      const decodedToken = await this.jwtService.verifyAsync(extractedToken, {
        secret: process.env.SECRET_KEY,
      });

      if (decodedToken.role !== 'ADMIN')
        throw new UnauthorizedException('Permission denied');
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }
}
