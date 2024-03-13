import { AfterViewInit, Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { LoginScreenMode } from './enums/login-screen-mode.enum';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SubSink } from 'subsink';
import { LoginFormInterface } from './form-interfaces/login.form-interface';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { AppState } from 'src/app/core/states/app-state';
import { sharedDataActions } from 'src/app/core/states/shared-data/shared-data.action';
import { sharedDataSelectors } from 'src/app/core/states/shared-data/shared-data.selector';
import { loginDto } from '../shared/dtos/login.dto';
import { AccountService } from '../shared/services/account.service';
import { AuthService } from '../shared/services/auth.service';
import { LoginModel } from '../shared/models/login.model';
import { Observable } from 'rxjs';
import { LoginSubAccountModel } from '../shared/models/login-sub-account.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {

  private subs = new SubSink();
  rForm?: FormGroup<LoginFormInterface>;

  get fCtrls() {
    return this.rForm!.controls;
  }

  get loginScreenMode() {
    return LoginScreenMode;
  }

  constructor(private _FormBuilder: FormBuilder, private _AuthService: AuthService,
    private _ToastrService: ToastrService, private _ActivatedRoute: ActivatedRoute,
    private _AccountService: AccountService, private _Router: Router, private _Store: Store<AppState>,
    private renderer: Renderer2, @Inject(DOCUMENT) private document: Document) {
    this.rForm = this._FormBuilder.group<LoginFormInterface>({
      mode: new FormControl(LoginScreenMode.MainAccount),
      returnUrl: new FormControl(null),
    });

    this.subs.sink = this._ActivatedRoute.queryParams.subscribe(params => {
      this.rForm?.controls.returnUrl.setValue(params['returnUrl']);

      const code = params['code'];
      if (code) {
        var platform: any = localStorage.getItem('platform');
        this.onVerifyLoginWith(code, platform);
      }
    });

    this._Store.select(sharedDataSelectors.token).subscribe((token) => {
      if (token) {
        this._Router.navigateByUrl('/dashboard');
      }
    });
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }

  onChangeMode(mode: LoginScreenMode) {
    this.fCtrls.mode.setValue(mode);
  }

  private onVerifyLoginWith(code: string, platform: string) {
    this.subs.sink = this._AuthService.verifyLoginWith({
      code: code,
      platform: platform
    }).subscribe((res: loginDto) => {
      this._Store.dispatch(sharedDataActions.setToken({ token: res.access_token }));
      this._Router.navigate(['/dashboard']);

      this._Store.dispatch(sharedDataActions.getUserProfile());
    }, (err: any) => {
      var errorMessage = err.error?.message;
      if (err.status == 422) {
        errorMessage = err?.error;
      }
      this._ToastrService.error(errorMessage, "Error");
    }
    )
  }
}
