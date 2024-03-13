import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { MainAccountContainerComponent } from './components/main-account-container/main-account-container.component';
import { SubAccountContainerComponent } from './components/sub-account-container/sub-account-container.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { LoginRoutingModule } from './login.routing';



@NgModule({
  declarations: [
    LoginComponent,
    MainAccountContainerComponent,
    SubAccountContainerComponent
  ],
  imports: [
    CommonModule ,
    RecaptchaModule ,
    NgxIntlTelInputModule ,
    ReactiveFormsModule ,
    LoginRoutingModule
  ]
})
export class LoginModule { }
