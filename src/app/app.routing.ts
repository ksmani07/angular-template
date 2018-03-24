import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import {
  FullLayoutComponent,
  SimpleLayoutComponent
} from './containers';
import {AuthGuard} from './services/authguard.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
   {
    path: 'dashboard', canActivate: [AuthGuard],
    component: FullLayoutComponent,
    data: {
      title: 'Dashboard'
    },
    children: [
      {
        path: '',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      }
    ]
  },
  {
    path: 'user', canActivate: [AuthGuard],
    component: FullLayoutComponent,
    data: {
      title: 'user'
    },
    children: [
      {
        path: '',
        loadChildren: './views/user/user.module#UserModule'
      }
    ]
  },
   {
    path: '',
    component: SimpleLayoutComponent,
    data: {
      title: 'Login'
    },
    children: [
      {
        path: 'login',
        loadChildren: './login/login.module#LoginModule'
      }
    ]},
  {path: '**', redirectTo: 'login', pathMatch: 'full' , canActivate: [AuthGuard]}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
