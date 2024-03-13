import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { RecaptchaModule } from 'ng-recaptcha';
import { CoreModule } from '../core/core.module';
import { AuthComponent } from './auth.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { EnterOtpSharedComponent } from './shared/components/enter-otp-shared/enter-otp-shared.component';



@NgModule({
  declarations: [
   AuthComponent,
    
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule ,
    RecaptchaModule ,
    NgxIntlTelInputModule
  ],
  exports:[]
})
export class AuthModule { }
