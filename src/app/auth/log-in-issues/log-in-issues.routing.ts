import { Routes, RouterModule } from '@angular/router';
import { LogInIssuesComponent } from './log-in-issues.component';

const routes: Routes = [
    {
        path: '',
        component: LogInIssuesComponent
    }
];

export const LogInIssuesRoutingModule = RouterModule.forChild(routes);