import { FormControl, FormGroup } from "@angular/forms";

export interface EnterOtpFormInterface {
    userName: FormControl<string | null>;
    userEmail : FormControl<string | null>;
    userPhone : FormControl<string | null>;
    trySendOtpCount: FormControl<number | null>;
    isExceededOtpTry: FormControl<boolean | null>;
    timerInSeconds : FormControl<number | null>;
    UpdatedUserData:FormGroup<UserDataChildOfEnterOtpFormInterface>
}

export interface UserDataChildOfEnterOtpFormInterface {
    userName:FormControl<string | null>;
    password:FormControl<string | null>;
}