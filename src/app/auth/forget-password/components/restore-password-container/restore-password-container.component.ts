import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/shared/services/auth.service';
import { environment } from 'src/environments/environment';
import { SubSink } from 'subsink';
import { ForgetPasswordFormInterface } from '../../forms-interfces/forget-password.form-interface';
import { ResetPasswordFormInterface } from '../../forms-interfces/reset-password.form-interface';
import { RecaptchaComponent } from 'ng-recaptcha';
import { HttpStatusCode } from '@angular/common/http';
import { AccountResetService } from 'src/app/auth/shared/services/account-reset.service';

@Component({
  selector: 'app-restore-password-container',
  templateUrl: './restore-password-container.component.html',
  styleUrls: ['./restore-password-container.component.scss']
})
export class RestorePasswordContainerComponent {
  private subs = new SubSink();
  reCaptchaKey = environment.siteKey;
  rForm!: FormGroup<ResetPasswordFormInterface>;

  get fCtrls() {
    return this.rForm.controls;
  }

  @ViewChild('reCapatchaElem') reCapatchaElem!: RecaptchaComponent;

  constructor(private _FormBuilder: FormBuilder, private _AuthService: AuthService,
    private _ToastrService: ToastrService , private _AccountResetService:AccountResetService) {
  }

  ngOnInit(): void {
    this.rForm = this._FormBuilder.group<ResetPasswordFormInterface>({
      email: new FormControl(null, [Validators.required, Validators.email]),
      reCaptcha: new FormControl(null),
      isEmailSended: new FormControl(false)
    })
  }

  onResolveReCaptcha(e: any) {
    if (e) {
      this.fCtrls.reCaptcha.setValue(e);
    }
  }

  onSendRecoverEmail() {
    this.subs.sink = this._AccountResetService.sendEmailToUserToResetPassword({
      email: this.fCtrls.email.value!,
      recaptchaResponse: this.fCtrls.reCaptcha.value!
    }).subscribe((res: any) => {
      this._ToastrService.success(' تم ارسال  رابط الاستعاده علي البريد الالكتروني بنجاح');
      this.fCtrls.isEmailSended.setValue(true);
    }, (error: any) => {
      var errorMessage = error.error?.message;
      if (error.status == HttpStatusCode.UnprocessableEntity ) {
        errorMessage = error?.error;
      }
      this._ToastrService.error(errorMessage || "حدث خطا ما ");
    },
    () => {
        this.reCapatchaElem.reset();
      });
  }

}
