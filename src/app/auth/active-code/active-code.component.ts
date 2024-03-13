import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActiveCodeFormInterface } from './forms-interfces/active-code.form-interface';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { OtpTypeEnum } from './enums/otp-type.enum';
import { AccountService } from '../shared/services/account.service';
import { ToastrService } from 'ngx-toastr';
import { EnterOtpSharedComponent } from '../shared/components/enter-otp-shared/enter-otp-shared.component';
import { AuthService } from '../shared/services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/states/app-state';
import { sharedDataActions } from 'src/app/core/states/shared-data/shared-data.action';
import { map, take, timer } from 'rxjs';

@Component({
  selector: 'app-active-code',
  templateUrl: './active-code.component.html',
  styleUrls: ['./active-code.component.scss']
})
export class ActiveCodeComponent implements OnInit {

  rForm!: FormGroup<ActiveCodeFormInterface>;
  reCaptchaKey = environment.siteKey;

  get fCtrls() {
    return this.rForm.controls;
  }

  @ViewChild('enterOtpShared', { static: false }) enterOtpSharedComponent!: EnterOtpSharedComponent;

  constructor(private _FormBuilder: FormBuilder, private _ActivatedRoute: ActivatedRoute,
    private _Router: Router, private _AccountService: AccountService,
    private _ToastrService: ToastrService, private _AuthService: AuthService,
    private _Store: Store<AppState>) { }

  ngOnInit(): void {
    this.rForm = this._FormBuilder.group<ActiveCodeFormInterface>({
      maxNumberOfTry: new FormControl(null),
      trySendOtpCount: new FormControl(null),
      otpType: new FormControl(null),
      isSubAccount: new FormControl(null),
      isExceededOtpTry: new FormControl(null) ,
      timerInSeconds: new FormControl(null)
    });

    this._ActivatedRoute.queryParams.subscribe((data: any) => {
      if (data?.type) {
        const otpType = data?.type == 'email' ? OtpTypeEnum.Email : OtpTypeEnum.Phone;
        this.fCtrls.otpType.setValue(otpType);
        this.fCtrls.isSubAccount.setValue(data?.subAccount ? true : false);

        this.onResendCode();
      } else {
        this._Router.navigate(['login'])
      }
    });

    this.enterOtpSharedComponent.onChangeOtpSuccefully.subscribe((res) => {
      this.verifyCode(res.otpCode, res.reCaptchaKey);
    });
  }

  verifyCode(otpCode: string, reCaptchaKey: string) {
    this._AccountService.setOtpCode({
      type: this.fCtrls.otpType.value,
      otpCode: otpCode,
      reCaptchaKey: reCaptchaKey,
      isSubAccount: this.fCtrls.isSubAccount.value
    }).subscribe((res) => {
      this._Store.dispatch(sharedDataActions.setToken({ token: res?.access_token }));
      this._Store.dispatch(sharedDataActions.getUserProfile());
      this._ToastrService.success('تم التحقق بنجاح');
        this._Router.navigate(['/dashboard'], { queryParams: {
            first: '1'
          }
      });
    }, error => {
      var errorMessage = error?.error?.message;
      if (error?.status != 400) {
        errorMessage = error?.error;
      }
      this._ToastrService.error(errorMessage);
      this.enterOtpSharedComponent.onResetReCaptcha();
    })
  }

  onResendCode() :any {
    if (this.fCtrls.timerInSeconds.value != null) {
      this._ToastrService.warning(`الرجاء الانتظار ${this.fCtrls.timerInSeconds.value} ثانيه حتى يسمح بالارسال مرة أخرى`);
      return false;
    }

    this.clearDataBeforeResendCode();

    const formValue = this.rForm.value;
    this._AccountService.sendOtpCode({
      type: formValue.otpType ,
      isSubAccount: formValue.isSubAccount
    }).subscribe((res) => {
      this.rForm.patchValue({
        trySendOtpCount: res?.num_count,
        maxNumberOfTry: 3
      });

      this._ToastrService.success('تم الارسال بنجاح');
    }, error => {
      if (error?.status == 400) {
        this.rForm.patchValue({
          trySendOtpCount: error?.error?.num_count,
          maxNumberOfTry: 3
        });

        if (error?.error?.message?.includes('تخطيت الاحد الاقصى')) {
          this.fCtrls.isExceededOtpTry.setValue(true);
        } else if (error?.error?.message?.includes('الانتظار دقيقة')) {
          this.startTimer(60);
          this._ToastrService.warning(error?.error?.message);
        }
      }

      this._ToastrService.error(error?.error?.message);
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
