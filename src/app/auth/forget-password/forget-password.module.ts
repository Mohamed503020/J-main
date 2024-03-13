import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';
import { ForgetPasswordComponent } from './forget-password.component';
import { ForgetPasswordRoutingModule } from './forget-password.routing';
import { RestorePasswordContainerComponent } from './components/restore-password-container/restore-password-container.component';
import { EnterOtpContainerComponent } from './components/enter-otp-container/enter-otp-container.component';
import { NgOtpInputModule } from  'ng-otp-input';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ForgetPasswordComponent,
    RestorePasswordContainerComponent,
    EnterOtpContainerComponent,
  ],
  imports: [
    CommonModule ,
    ReactiveFormsModule  ,
    RecaptchaModule ,
    ForgetPasswordRoutingModule ,
    NgOtpInputModule ,
    SharedModule
  ]
})
export class ForgetPasswordModule { }
