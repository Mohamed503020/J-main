import { Routes, RouterModule } from '@angular/router';
import { ActiveCodeComponent } from './active-code.component';

const routes: Routes = [
    {
        path: '',
        component: ActiveCodeComponent
    }
];

export const ActiveCodeRoutingModule = RouterModule.forChild(routes);