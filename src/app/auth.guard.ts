import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import {
  ActivatedRouteSnapshot,
  CanActivateChildFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

export const CanActivate = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isAuthenticated = await authService.isAuthenticated();

  if (isAuthenticated) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};

export const canActivateChild: CanActivateChildFn = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  return await authService.isAuthenticated();
};
