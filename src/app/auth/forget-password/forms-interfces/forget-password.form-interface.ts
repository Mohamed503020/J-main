import { FormControl } from "@angular/forms";
import { ForgetPasswordModeEnum } from "../enums/forget-password-mode.enum";

export interface ForgetPasswordFormInterface {
  mode:FormControl<ForgetPasswordModeEnum|null>;
  forgetToken:FormControl<string|null>;
}
