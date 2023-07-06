// permissions.service.ts

import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ROLES_PERMISSIONS } from './roles-authorization.config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthorizationService {
  constructor(private readonly jwtService: JwtService) {}
  hasAuthorization(
    userRole: string,
    resource: string,
    action: string,
  ): boolean {
    const permissions = ROLES_PERMISSIONS[userRole];
    if (!permissions) {
      return false;
    }
    const allowedActions = permissions[resource];
    if (!allowedActions) {
      return false;
    }
    return allowedActions.includes(action);
  }

  async generateAccessTokenFromRefreshToken(refreshToken: string) {
    try {
      const user = await this.verifyRefreshToken(refreshToken);
      return {
        token: await this.jwtService.signAsync(
          {
            name: user.name,
            sub: user.sub,
            role: user.role,
            exp: Math.floor(Date.now() / 1000) + 60,
          },
          { secret: process.env.JWT_SECRET_KEY },
        ),
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to sign the JWT token');
    }
  }

  private async verifyRefreshToken(refreshToken: string) {
    try {
      const decodedToken = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_SECRET_KEY,
      });

      return {
        name: decodedToken.name,
        sub: decodedToken.sub,
        role: decodedToken.role,
        exp: Math.floor(Date.now() / 1000) + 60,
      };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
