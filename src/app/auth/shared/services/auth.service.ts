import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { loginDto } from '../dtos/login.dto';
import { LoginModel } from '../models/login.model';
import { VerifyLoginWithModel } from '../models/verify-login-with.model';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/states/app-state';
import { sharedDataActions } from 'src/app/core/states/shared-data/shared-data.action';
import { ForgetPasswordModel } from '../models/forget-password.model';
import { ForgetPasswordDto } from '../dtos/forget-password.dto';
import { LoginSubAccountModel } from '../models/login-sub-account.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = environment.apiUrl + "/auth";

  constructor(private _HttpClient: HttpClient, private _Store: Store<AppState>) {
  }

  login(model: LoginModel): Observable<loginDto> {
    const headers = new HttpHeaders({ 'x-password': model.password });
    return this._HttpClient.post<loginDto>(`${this.url}/login`, {
      email: model.email,
      'g-recaptcha-response': model.recaptchaResponse
    }, { headers: headers });
  }

  loginSubAccount(model: LoginSubAccountModel): Observable<loginDto> {
    const headers = new HttpHeaders({ 'x-password': model.password });
    return this._HttpClient.post<loginDto>(`${this.url}/sub-login`, {
      email: model.email,
      'g-recaptcha-response': model.recaptchaResponse ,
      mobile : model.mobile ,
      country_iso : model.country_iso
  } , { headers: headers });
  }

  loginWith(platform: string) {
    localStorage.setItem('platform', platform);
    return this._HttpClient.get<loginDto>(`${this.url}/${platform}/redirect?redirect=${location.origin}/auth/login`);
  }

  verifyLoginWith(model: VerifyLoginWithModel) {
    return this._HttpClient.post<loginDto>(`${this.url}/${model.platform}/login`, { code: model.code, redirect: `${location.origin}/auth/login` });
  }
}
