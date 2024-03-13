import { FormControl } from "@angular/forms";

export interface ResetPasswordFormInterface {
    reCaptcha: FormControl<string | null>;
    email: FormControl<string | null>;
    isEmailSended:FormControl<boolean | null>;
}