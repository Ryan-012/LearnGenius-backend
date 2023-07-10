// permissions.service.ts

import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ROLES_PERMISSIONS } from './roles-authorization.config';
import { JwtService } from '@nestjs/jwt';
// import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AuthorizationService {
  constructor(private readonly jwtService: JwtService) {}
  hasAuthorization(
    userRole: string,
    resource: string,
    action: string,
  ): boolean {
    if (resource === 'authorization') return true;
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
}
