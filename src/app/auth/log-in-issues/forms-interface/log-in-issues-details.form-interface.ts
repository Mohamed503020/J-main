import { FormControl } from "@angular/forms";

export interface LogInIssuesDetailsFormInterface {
  name: FormControl<string | null>;
  email: FormControl<string | null>;
  phone:FormControl<any | null>;
  contactMethod: FormControl<string | null>;
  reCaptcha: FormControl<string | null>;
  selectedCountryISO: FormControl<any | null>;
  fileUrl:FormControl<string | null>;
}
