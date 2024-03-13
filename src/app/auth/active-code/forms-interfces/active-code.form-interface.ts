import { FormControl } from "@angular/forms";
import { OtpTypeEnum } from "../enums/otp-type.enum";
export interface ActiveCodeFormInterface {
  trySendOtpCount: FormControl<number | null>;
  maxNumberOfTry: FormControl<number | null>;
  otpType: FormControl<OtpTypeEnum | null>;
  isSubAccount: FormControl<boolean | null>;
  isExceededOtpTry: FormControl<boolean | null>;
  timerInSeconds : FormControl<number | null>;
}
