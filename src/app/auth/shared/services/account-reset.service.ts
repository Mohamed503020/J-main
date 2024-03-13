import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/core/states/app-state';
import { environment } from 'src/environments/environment';
import { ForgetPasswordModel } from '../models/forget-password.model';
import { VerifyCodeAfterSendMailModel } from '../models/verify-code-after-send-mail.model';
import { ResendCodeToPhoneModel } from '../models/resend-code-to-phone.model';
import { ResendCodeToPhoneDto } from '../dtos/resend-code-to-phone.dto';

@Injectable({
  providedIn: 'root'
})
export class AccountResetService {

  url = environment.apiUrl + "/account-reset";

  constructor(private _HttpClient: HttpClient, private _Store: Store<AppState>) {
  }

  sendEmailToUserToResetPassword(model: ForgetPasswordModel): Observable<any> {
    return this._HttpClient.post<any>(`${this.url}`, {
      email: model.email,
      'g-recaptcha-response': model.recaptchaResponse
    });
  }

  verifyCodeAfterSendMail(model: VerifyCodeAfterSendMailModel): Observable<any> {
    return this._HttpClient.post(`${this.url}/verify`, {
      code : model.code,
      token : model.token,
      'g-recaptcha-response': model.recaptchaResponse
    });
  }

  resendCodeToPhone(model:ResendCodeToPhoneModel): Observable<ResendCodeToPhoneDto> {
    return this._HttpClient.post<ResendCodeToPhoneDto>(`${this.url}/resend-verify-user-sms`,model);
  }
}
