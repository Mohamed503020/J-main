import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'auth/login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'forgot-password',
        loadChildren: () => import('./forget-password/forget-password.module').then(m => m.ForgetPasswordModule)
      },
      {
        path: 'auth/forgot-password',
        loadChildren: () => import('./forget-password/forget-password.module').then(m => m.ForgetPasswordModule),
      },
      {
        path: 'login-issues',
        loadChildren: () => import('./log-in-issues/log-in-issues.module').then(m => m.LogInIssuesModule)
      },
      {
        path: 'active-code',
        loadChildren: () => import('./active-code/active-code.module').then(m => m.ActiveCodeModule)
      }
    ]
  }
];

export const AuthRoutingModule = RouterModule.forChild(routes);
