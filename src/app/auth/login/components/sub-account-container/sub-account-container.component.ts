import { Component, EventEmitter, Inject, Output, Renderer2, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/shared/services/auth.service';
import { environment } from 'src/environments/environment';
import { SubSink } from 'subsink';
import { MainAccountContainerFormInterface } from '../../form-interfaces/main-account-container.form-interface';
import { SubAccountContainerFormInterface } from '../../form-interfaces/sub-account-container.form-interface';
import { CountryISO, SearchCountryField } from 'ngx-intl-tel-input';
import { LoginModel } from 'src/app/auth/shared/models/login.model';
import { LoginSubAccountModel } from 'src/app/auth/shared/models/login-sub-account.model';
import { RecaptchaComponent } from 'ng-recaptcha';
import { sharedDataActions } from 'src/app/core/states/shared-data/shared-data.action';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/auth/shared/services/account.service';
import { AppState } from 'src/app/core/states/app-state';
import { constantSelectors } from 'src/app/core/states/constant/constant.selector';

@Component({
  selector: 'app-sub-account-container',
  templateUrl: './sub-account-container.component.html',
  styleUrls: ['./sub-account-container.component.scss']
})
export class SubAccountContainerComponent {

  private subs = new SubSink();
  rForm!: FormGroup<SubAccountContainerFormInterface>;
  reCaptchaKey = environment.siteKey;

  preferredCountries$ = this._Store.select(constantSelectors.preferredPhoneCountries);

  get fCtrls() {
    return this.rForm.controls;
  }

  get countryISO() {
    return CountryISO;
  }

  get searchCountryField() {
    return SearchCountryField;
  }

  @ViewChild('reCapatchaElem') reCapatchaElem!: RecaptchaComponent;

  constructor(private _FormBuilder: FormBuilder, private _AuthService: AuthService,
    private _ToastrService: ToastrService, private _ActivatedRoute: ActivatedRoute,
    private _AccountService: AccountService, private _Router: Router, private _Store: Store<AppState>,
    private renderer: Renderer2, @Inject(DOCUMENT) private document: Document) {
  }

  ngOnInit(): void {
    this.rForm = this._FormBuilder.group<SubAccountContainerFormInterface>({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(320)]),
      phone: new FormControl(null, [Validators.required]),
      reCaptcha: new FormControl(null),
      selectedCountryISO: new FormControl(CountryISO.SaudiArabia)
    })
  }

  onLogin() {
    this.subs.sink = this._AuthService.loginSubAccount({
      email: this.fCtrls.email.value!,
      password: this.fCtrls.password.value!,
      mobile: this.fCtrls.phone.value == null ? "" : this.fCtrls.phone.value?.e164Number.replace("+", ""),
      country_iso: this.fCtrls.phone.value == null ? "" : this.fCtrls.phone.value?.countryCode!,
      recaptchaResponse: this.fCtrls.reCaptcha.value!
    }).subscribe(res => {
      this._Store.dispatch(sharedDataActions.setToken({ token: res?.access_token }));
      this._Store.dispatch(sharedDataActions.setCurrentUser({ user: res?.item }));
      if (res?.item?.is_first_login || (!res?.item?.active_email_verify && !res?.item?.active_sms_verify)) {
        this.onsetUserEmailVerified();
      } else {
        this.getUserProfile();
      }
      this.reCapatchaElem.reset();
    }, (err: any) => {
      var errorMessage = err.error?.message;
      if (err.status == 422) {
        errorMessage = err?.error;
      }
      this._ToastrService.error(errorMessage);
      this.reCapatchaElem.reset();
    });
  }

  private onsetUserEmailVerified() {
    this.subs.sink = this._AccountService.updateOtpSettings({
      active_email_verify: 1
    }).subscribe(res => {
      this.getUserProfile();
    })
  }

  private getUserProfile() {
    this.subs.sink = this._AccountService.getUserProfileData().subscribe((res: any) => {
      this._Store.dispatch(sharedDataActions.setCurrentUser({ user: res?.item }));
      this._Router.navigate(['/dashboard'])
    })
  }

}
