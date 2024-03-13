import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/states/app-state';
import { CreateErrorInLoginModel } from '../models/create-error-in-login.model';

@Injectable({
  providedIn: 'root'
})
export class ConstantService {
  constructor(private _HttpClient: HttpClient, private _Store: Store<AppState>) {
  }

  getErrorsInLogin() {
    return this._HttpClient.post('https://hook.us1.make.com/dp1gkiypgw922a6v6j3bq21krvj0m5fy', {
      event: "user.login.error_in_login",
      action: "get_main",
      hash: "345345345-345345345-55",
      ip: "192.168.1.1"
    }, { headers: { 'Content-Type': 'text/plain' } })
  }

  createErrorInLogin(model: CreateErrorInLoginModel) {
    return this._HttpClient.post('https://hook.us1.make.com/dp1gkiypgw922a6v6j3bq21krvj0m5fy', {
      event: "user.login.error_in_login",
      action: "error",
      name: model.name,
      mobile: model.mobile,
      email: model.email,
      way: model.contactOption,
      "main error": model.mainError,
      "sub error": model.subError,
      hash: "345345345-345345345-55",
      url: model.imgUrl,
      ip: model.ip,
    }, { headers: { 'Content-Type': 'text/plain' } })
  }
}
