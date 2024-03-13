import { Routes, RouterModule } from '@angular/router'
import { FeaturesComponent } from './features.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { authGuard } from '../shared/guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: FeaturesComponent,
        canActivateChild: [authGuard],
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent,
                data: {
                    pageTitle: 'Dashboard',
                    breadCrumb: {
                        title: 'Dashboard'
                    }
                }
            }]
    }
];


export const FeaturesRoutingModule = RouterModule.forChild(routes);
