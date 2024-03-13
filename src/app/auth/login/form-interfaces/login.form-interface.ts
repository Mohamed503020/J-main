import { FormControl, FormGroup } from "@angular/forms";
import { LoginScreenMode } from "../enums/login-screen-mode.enum";

export interface LoginFormInterface {
  returnUrl: FormControl<string | null>;
  mode:FormControl<LoginScreenMode|null>
}
