import { Routes, RouterModule } from '@angular/router';
import { ForgetPasswordComponent } from './forget-password.component';

const routes: Routes = [
    {
        path: '',
        component: ForgetPasswordComponent
    }
];

export const ForgetPasswordRoutingModule = RouterModule.forChild(routes);