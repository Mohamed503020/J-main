import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResendCodeToPhoneDto } from "src/app/auth/shared/dtos/resend-code-to-phone.dto";
import { ForgetPasswordModel } from "src/app/auth/shared/models/forget-password.model";
import { ResendCodeToPhoneModel } from "src/app/auth/shared/models/resend-code-to-phone.model";
import { VerifyCodeAfterSendMailModel } from "src/app/auth/shared/models/verify-code-after-send-mail.model";
declare var KTComponents: any;
declare var KTDrawer: any;

@Injectable({
  providedIn: 'root'
})
export class TemplateConfigSetting {

  constructor() {
  }

  reloadTemplateJs() {
    KTComponents.init();
  }

  drawerHideAll() {
    KTDrawer.hideAll();
  }
}
