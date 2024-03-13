import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';

const routes: Routes = [
    {
        path: '',
        component: LoginComponent ,
        data:{
            pageTitle:'Login'
        }
    }
];

export const LoginRoutingModule = RouterModule.forChild(routes);