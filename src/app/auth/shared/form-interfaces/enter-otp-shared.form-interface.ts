import { FormControl } from "@angular/forms";

export interface EnterOtpSharedFormInterface {
    reCaptchaKey: FormControl<string | null>;
    otpCode: FormControl<string | null>;
}