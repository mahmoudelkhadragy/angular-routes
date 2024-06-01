import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Server } from '../../models/server.model';
import { inject } from '@angular/core';
import { ServersService } from '../servers.service';

export const serverResolveFn: ResolveFn<Server> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const userService = inject(ServersService);
  const serverId = +route.params['id'];
  return userService.getServer(serverId);
};
