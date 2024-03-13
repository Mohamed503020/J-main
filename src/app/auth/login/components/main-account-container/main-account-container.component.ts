import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Inject, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MainAccountContainerFormInterface } from '../../form-interfaces/main-account-container.form-interface';
import { LoginPlatform } from '../../enums/login-platform.enum';
import { SubSink } from 'subsink';
import { AuthService } from 'src/app/auth/shared/services/auth.service';
import { environment } from 'src/environments/environment';
import { LoginModel } from 'src/app/auth/shared/models/login.model';
import { RecaptchaComponent } from 'ng-recaptcha';
import { ToastrService } from 'ngx-toastr';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AccountService } from 'src/app/auth/shared/services/account.service';
import { AppState } from 'src/app/core/states/app-state';
import { sharedDataActions } from 'src/app/core/states/shared-data/shared-data.action';
declare var $: any
@Component({
  selector: 'app-main-account-container',
  templateUrl: './main-account-container.component.html',
  styleUrls: ['./main-account-container.component.scss']
})
export class MainAccountContainerComponent implements OnInit, AfterViewInit {

  private subs = new SubSink();
  rForm!: FormGroup<MainAccountContainerFormInterface>;
  reCaptchaKey = environment.siteKey;

  get fCtrls() {
    return this.rForm.controls;
  }

  get loginPlatform() {
    return LoginPlatform;
  }

  @ViewChild('reCapatchaElem') reCapatchaElem!: RecaptchaComponent;
  @ViewChild('nForm') nForm!: NgForm;

  constructor(private _FormBuilder: FormBuilder, private _AuthService: AuthService,
    private _ToastrService: ToastrService, private _ActivatedRoute: ActivatedRoute,
    private _AccountService: AccountService, private _Router: Router, private _Store: Store<AppState>,
    private renderer: Renderer2, @Inject(DOCUMENT) private document: Document,
    private _ChangeDetectorRef: ChangeDetectorRef) {
  }
  ngAfterViewInit(): void {
    this.fCtrls.reCaptcha.valueChanges.subscribe((value: any) => {
      if (value) {
        if (environment.developmentToken) {
          this._Store.dispatch(sharedDataActions.setToken({ token: environment.developmentToken }));
          this.getUserProfile();
        } else {
          (this.nForm as any).submitted = true;
          if (this.rForm.invalid) {
            this.reCapatchaElem.reset();
          } else {
            this.onLogin();
          }
        }
      }
    })
  }

  ngOnInit(): void {
    this.rForm = this._FormBuilder.group<MainAccountContainerFormInterface>({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(320)]),
      reCaptcha: new FormControl(null)
    });

  }

  onLogin() {
    const formValue = this.rForm!.value;
    this.subs.sink = this._AuthService.login({
      email: this.fCtrls.email.value!,
      password: this.fCtrls.password.value!,
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

  onLoginWith(platform: LoginPlatform) {
    this.subs.sink = this._AuthService.loginWith(platform)
      .subscribe((res: any) => {
        if (res?.url) {
          window.location.href = res?.url;
        }
      })
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
