import { Component, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RecaptchaComponent } from 'ng-recaptcha';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/shared/services/auth.service';
import { environment } from 'src/environments/environment';
import { SubSink } from 'subsink';
import { ResetPasswordFormInterface } from '../../forms-interfces/reset-password.form-interface';
import { EnterOtpFormInterface, UserDataChildOfEnterOtpFormInterface } from '../../forms-interfces/enter-otp.form-interface';
import { Observable, filter, take, timer } from 'rxjs';
import { AccountResetService } from 'src/app/auth/shared/services/account-reset.service';
import { ResendCodeToPhoneDto } from 'src/app/auth/shared/dtos/resend-code-to-phone.dto';
import { EnterOtpSharedComponent } from 'src/app/auth/shared/components/enter-otp-shared/enter-otp-shared.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enter-otp-container',
  templateUrl: './enter-otp-container.component.html',
  styleUrls: ['./enter-otp-container.component.scss']
})
export class EnterOtpContainerComponent {
  private subs = new SubSink();
  reCaptchaKey = environment.siteKey;
  rForm!: FormGroup<EnterOtpFormInterface>;

  get fCtrls() {
    return this.rForm.controls;
  }

  @Input() forgetToken!: string;

  @ViewChild('reCapatchaElem') reCapatchaElem!: RecaptchaComponent;
  @ViewChild('enterOtpShared') enterOtpSharedComponent!: EnterOtpSharedComponent;

  constructor(private _FormBuilder: FormBuilder, private _AuthService: AuthService,
    private _ToastrService: ToastrService, private _AccountResetService: AccountResetService ,
    private _Router : Router) {
  }

  ngOnInit(): void {
    this.rForm = this._FormBuilder.group<EnterOtpFormInterface>({
      userEmail: new FormControl(null),
      userPhone: new FormControl(null),
      userName: new FormControl(null),
      trySendOtpCount: new FormControl(null),
      isExceededOtpTry: new FormControl(false),
      timerInSeconds: new FormControl(null) ,
      UpdatedUserData: this._FormBuilder.group<UserDataChildOfEnterOtpFormInterface>({
        userName: new FormControl(null),
        password: new FormControl(null)
      })
    });

    this.fCtrls.userEmail.disable();
    this.fCtrls.userPhone.disable();

    if (this.forgetToken) {
      this.onResendCode();
    }
  }

  verifyCode(otpCode: string, recaptcha: string) {
    const formValue = this.rForm.value;
    if (!recaptcha) {
      this._ToastrService.warning('الرجاء التحقق من أنك لست روبوت');
      return;
    };

    this._AccountResetService.verifyCodeAfterSendMail({
      code: otpCode,
      token: this.forgetToken,
      recaptchaResponse: recaptcha
    }).subscribe((res: any) => {
      this._ToastrService.success('تم التحقق بنجاح');

    }, error => {
      this._ToastrService.error(error?.error?.message);
      this.enterOtpSharedComponent.onResetReCaptcha();
    })
  }

  onResendCode(): any {
    if (this.fCtrls.timerInSeconds.value != null) {
      this._ToastrService.warning(`الرجاء الانتظار ${this.fCtrls.timerInSeconds.value} ثانيه حتى يسمح بالارسال مرة أخرى`);
      return false;
    }

    this.clearDataBeforeResendCode();
    this._AccountResetService.resendCodeToPhone({
      token: this.forgetToken
    }).subscribe(res => {
      this.rForm.patchValue({
        trySendOtpCount: res?.num_count,
        userEmail: res?.email,
        userPhone: res?.mobile,
        userName: res?.name,
      });
      this._ToastrService.success('تم الارسال بنجاح');
    }, error => {
      var res = error.error as ResendCodeToPhoneDto;
      this.rForm.patchValue({
        trySendOtpCount: res?.num_count,
        userEmail: res?.email,
        userPhone: res?.mobile,
        userName: res?.name
      });
      if (error?.status == 400) {
        if (res?.message?.includes('تخطيت')) {
          this.rForm.patchValue({
            isExceededOtpTry: true,
          });
        } else if (res?.message?.includes('الانتظار دقيقة')) {
          this.startTimer(60);
          this._ToastrService.warning(res?.message);
        }else if(error.error.code == 4000){
          this._ToastrService.error(error.error.message);
          this._Router.navigateByUrl('/login');
        }
      }
       else {
        var errorMessage = res?.message;
        this._ToastrService.warning(errorMessage || 'حدث خطأ ما');
      }
    })
  }

  private startTimer(intervalInSeconds: number) {
    timer(0, 1000).pipe(take(intervalInSeconds)).subscribe(x => {
      this.fCtrls.timerInSeconds.patchValue(x + 1 < intervalInSeconds ? intervalInSeconds - x : null);
    });
  }

  private clearDataBeforeResendCode() {
    this.rForm.patchValue({
      timerInSeconds: null,
    });
  }

}
