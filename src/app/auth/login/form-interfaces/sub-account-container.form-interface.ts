import { FormControl } from "@angular/forms";

export interface SubAccountContainerFormInterface {
    email: FormControl<string | null>;
    phone:FormControl<any | null>;
    password: FormControl<string | null>;
    reCaptcha: FormControl<string | null>;
    selectedCountryISO: FormControl<any | null>;
}