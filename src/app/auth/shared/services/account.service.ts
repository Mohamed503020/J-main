import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { updateOtpSettingsModel } from '../models/update-otp-settings.model';
import { Observable } from 'rxjs';
import { SetOtpCodeModel } from '../models/set-otp-code.model';
import { SetOtpCodeDto } from '../dtos/set-otp-code.dto';
import { SendOtpCodeModel } from '../models/send-otp-code.model';
import { SendOtpCodeDto } from '../dtos/send-otp-code.dto';
import { UserDto } from '../dtos/user.dto';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  url = environment.apiUrl + "/account";

  constructor(private _HttpClient: HttpClient) { }

  getUserProfileData() {
    return this._HttpClient.get<UserDto>(`${this.url}/profile`);
  }

  updateOtpSettings(model: updateOtpSettingsModel): Observable<any> {
    const url = `${this.url}/profile/update-otp-settings`;
    return this._HttpClient.post(url, model);
  }

  sendOtpCode(model: SendOtpCodeModel): Observable<SendOtpCodeDto> {
    var actionUrl = `${this.url}/profile/verify/${model.type}/send-code`;
    if (model.isSubAccount == true) {
      actionUrl = `${this.url}/profile/sub/verify/${model.type}/send-code`;
    }
    return this._HttpClient.get<SendOtpCodeDto>(actionUrl);
  }

  setOtpCode(model: SetOtpCodeModel): Observable<SetOtpCodeDto> {
    var actionUrl = `${this.url}/profile/verify/${model.type}/set-code`;
    if (model.isSubAccount == true) {
      actionUrl = `${this.url}/profile/sub/verify/${model.type}/set-code`;
    }
    return this._HttpClient.patch<SetOtpCodeDto>(actionUrl, {
      code: model.otpCode ,
      'g-recaptcha-response': model.reCaptchaKey
    });
  }

}
