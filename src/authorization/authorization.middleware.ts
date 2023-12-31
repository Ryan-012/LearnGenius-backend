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

  async use(request: Request, response: Response, next: NextFunction) {
    const path = request.baseUrl.split('/')[1];
    const authToken = request.headers['authorization'];
    try {
      if (!authToken)
        throw new UnauthorizedException('Inexistent access token');

      const extractedToken = authToken.split(' ')[1];

      const decodedToken = await this.jwtService.verifyAsync(extractedToken, {
        secret: process.env.JWT_SECRET_KEY,
      });

      const hasAuthorization = this.authorizationService.hasAuthorization(
        decodedToken.role,
        path,
        request.method,
      );

      if (!hasAuthorization) {
        throw new UnauthorizedException('Invalid authorization');
      }

      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid authorization');
    }
  }
}
