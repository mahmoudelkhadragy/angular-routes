import {
  ActivatedRouteSnapshot,
  CanDeactivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { EditServerComponent } from './edit-server.component';

export const canDeactivateGuardFn: CanDeactivateFn<EditServerComponent> = (
  component: EditServerComponent
) => {
  return component.canDeactivate ? component.canDeactivate() : true;
};
