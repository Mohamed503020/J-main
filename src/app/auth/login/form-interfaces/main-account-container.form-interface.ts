import { FormControl } from "@angular/forms";

export interface MainAccountContainerFormInterface {
    email: FormControl<string | null>;
    password: FormControl<string | null>;
    reCaptcha: FormControl<string | null>;
}