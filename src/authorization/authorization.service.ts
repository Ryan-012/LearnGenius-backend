// permissions.service.ts

import { Injectable } from '@nestjs/common';
import { ROLES_PERMISSIONS } from './roles-authorization.config';

@Injectable()
export class AuthorizationService {
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
}
