
import { Routes, RouterModule } from '@angular/router'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '', loadChildren: () => import('./features/features.module').then(m => m.FeaturesModule)
  },
  {
    path: '**', redirectTo: 'login', pathMatch: 'full'
  }
];


export const AppRoutingModule = RouterModule.forRoot(routes);
