import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { AuthorizationService } from './authorization.service';

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private authorizationService: AuthorizationService,
  ) {}

  async use(request: Request, res: Response, next: NextFunction) {
    const path = request.baseUrl.split('/')[1];

    const authToken = request.headers['authorization'];

    if (!authToken)
      throw new UnauthorizedException('Authentication token is required');

    const extractedToken = authToken.split(' ')[1];

    try {
      const decodedToken = await this.jwtService.verifyAsync(extractedToken, {
        secret: process.env.SECRET_KEY,
      });

      const hasAuthorization = this.authorizationService.hasAuthorization(
        decodedToken.role,
        path,
        request.method,
      );
      if (!hasAuthorization) throw new UnauthorizedException();
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }

    next();
  }
}
