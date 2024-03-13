import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogInIssuesComponent } from './log-in-issues.component';
import { LogInIssueDetailsComponent } from './components/log-in-issue-details/log-in-issue-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { LogInIssuesRoutingModule } from './log-in-issues.routing';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { RecaptchaModule } from 'ng-recaptcha';



@NgModule({
  declarations: [
    LogInIssuesComponent,
    LogInIssueDetailsComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    LogInIssuesRoutingModule,
    ReactiveFormsModule,
    NgxIntlTelInputModule ,
    RecaptchaModule ,
    ReactiveFormsModule ,
  
  ]
})
export class LogInIssuesModule { }
