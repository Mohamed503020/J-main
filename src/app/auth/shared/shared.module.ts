import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnterOtpSharedComponent } from './components/enter-otp-shared/enter-otp-shared.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgOtpInputModule } from 'ng-otp-input';
import { RecaptchaModule } from 'ng-recaptcha';



@NgModule({
  declarations: [
    EnterOtpSharedComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgOtpInputModule,
    RecaptchaModule
  ],
  exports: [
    EnterOtpSharedComponent
  ]
})
export class SharedModule { }
