import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { AuthorizationService } from './authorization.service';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private authorizationService: AuthorizationService,
    private authService: AuthorizationService,
  ) {}

  async use(request: Request, response: Response, next: NextFunction) {
    const path = request.baseUrl.split('/')[1];

    const { refresh_token, access_token } = request.cookies;

    if (!access_token)
      throw new UnauthorizedException('Authentication token is required');

    try {
      const decodedToken = await this.jwtService.verifyAsync(access_token, {
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
      if (error.name === 'TokenExpiredError') {
        if (!refresh_token) throw new UnauthorizedException();
        const newAccessToken =
          await this.authService.generateAccessTokenFromRefreshToken(
            refresh_token,
          );

        response.cookie('access_token', newAccessToken);
        return next();
      } else {
        throw new UnauthorizedException('Invalid authorization');
      }
    }
  }

  // private refreshToken() {}
}
