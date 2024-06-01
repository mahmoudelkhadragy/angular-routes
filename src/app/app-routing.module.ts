import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './users/user/user.component';
import { ServersComponent } from './servers/servers.component';
import { ServerComponent } from './servers/server/server.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UsersComponent } from './users/users.component';
import { AuthGuardService } from './auth-guard.service';
import { CanDeactivateGuard } from './servers/edit-server/can-deactivate-guard.service';
import { canDeactivateGuardFn } from './servers/edit-server/can-deactivateFn-guard';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ServerResolver } from './servers/server/server-resolver.service';
import { serverResolveFn } from './servers/server/server-resolverfn';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'users',
    component: UsersComponent,
    children: [{ path: ':id/:name', component: UserComponent }],
  },
  {
    path: 'servers',
    component: ServersComponent,
    // canActivate: [AuthGuardService], // using CanActivate interface Deprecated after v14
    // canActivate: [CanActivate],      // using CanActivateFn
    canActivateChild: [AuthGuardService], // using CanActivateChild interface Deprecated after v14
    // canActivateChild: [canActivateChild],  // using CanActivateChildFn

    children: [
      {
        path: ':id',
        component: ServerComponent,
        // resolve: { server: ServerResolver }, // using Resolve interface Deprecated after v14 to resolve data before component is activated
        resolve: { server: serverResolveFn }, // using ResolveFn to resolve data before component is activated
      },
      {
        path: ':id/edit',
        component: EditServerComponent,
        // canDeactivate: [CanDeactivateGuard], // using CanDeactivate interface Deprecated after v14
        canDeactivate: [canDeactivateGuardFn],
      },
    ],
  },
  // { path: 'not-found', component: PageNotFoundComponent },
  {
    path: 'not-found',
    component: ErrorPageComponent,
    data: { errorMessage: 'Not found ya Khadragy' }, // using pass data in route data
  },
  { path: '**', redirectTo: 'not-found' }, // make sure to be last route
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
