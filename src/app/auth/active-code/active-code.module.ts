import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActiveCodeComponent } from './active-code.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ActiveCodeRoutingModule } from './active-code.routing';
import { NgOtpInputModule } from 'ng-otp-input';
import { RecaptchaModule } from 'ng-recaptcha';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ActiveCodeComponent
  ],
  imports: [
    CommonModule ,
    ActiveCodeRoutingModule ,
    ReactiveFormsModule ,
    RecaptchaModule ,
    NgOtpInputModule ,
    SharedModule
  ]
})
export class ActiveCodeModule { }
