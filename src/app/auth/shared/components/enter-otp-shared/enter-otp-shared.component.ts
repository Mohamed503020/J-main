import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EnterOtpSharedFormInterface } from '../../form-interfaces/enter-otp-shared.form-interface';
import { environment } from 'src/environments/environment';
import { RecaptchaComponent } from 'ng-recaptcha';
import { NgOtpInputComponent } from 'ng-otp-input';

@Component({
  selector: 'app-enter-otp-shared',
  templateUrl: './enter-otp-shared.component.html',
  styleUrls: ['./enter-otp-shared.component.scss']
})
export class EnterOtpSharedComponent implements OnInit {

  reCaptchaKey = environment.siteKey;
  rForm!: FormGroup<EnterOtpSharedFormInterface>;

  get fCtrls() {
    return this.rForm.controls;
  }

  @Input() numberOfTry!: number;
  @Input() maxNumberOfTry!: number;
  @Input() isExceededOtpTry!: boolean;

  @Output() onBackEmit = new EventEmitter();
  @Output() onResendCodeEmit = new EventEmitter();
  @Output() onChangeOtpSuccefully = new EventEmitter<{ otpCode: string, reCaptchaKey: string }>();

  @ViewChild('reCapatchaElem') reCapatchaElem!: RecaptchaComponent;
  @ViewChild('ngOtpInput') ngOtpInput!: NgOtpInputComponent;

  constructor(private _FormBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.rForm = this._FormBuilder.group<EnterOtpSharedFormInterface>({
      reCaptchaKey: new FormControl(null),
      otpCode: new FormControl(null)
    });

    this.rForm.valueChanges.subscribe((value) => {
      if (value.otpCode?.length == 6 && value.reCaptchaKey != null) {
        this.onChangeOtpSuccefully.emit({ otpCode: value.otpCode, reCaptchaKey: value.reCaptchaKey });
      }
    })
  }

  onGoBack() {
    this.onBackEmit.emit();
  }

  onResendCode() {
    this.onResendCodeEmit.emit();
  }

  onResetReCaptcha() {
    this.reCapatchaElem.reset();
  }

  onReset() {
    this.reCapatchaElem.reset();
    this.ngOtpInput.setValue('');
  }
}
