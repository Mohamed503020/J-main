import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ForgetPasswordFormInterface } from './forms-interfces/forget-password.form-interface';
import { environment } from 'src/environments/environment';
import { AuthService } from '../shared/services/auth.service';
import { SubSink } from 'subsink';
import { ToastrService } from 'ngx-toastr';
import { ForgetPasswordModeEnum } from './enums/forget-password-mode.enum';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  private subs = new SubSink();
  reCaptchaKey = environment.siteKey;
  rForm!: FormGroup<ForgetPasswordFormInterface>;

  get fCtrls() {
    return this.rForm.controls;
  }

  get forgetPasswordModeEnum() {
    return ForgetPasswordModeEnum;
  }

  constructor(private _FormBuilder: FormBuilder, private _AuthService: AuthService,
    private _ToastrService: ToastrService, private _ActivatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.rForm = this._FormBuilder.group<ForgetPasswordFormInterface>({
      mode: new FormControl(ForgetPasswordModeEnum.ResetPassword),
      forgetToken: new FormControl(null)
    });

    this.subs.sink = this._ActivatedRoute.queryParams.subscribe(params => {
      var forgetToken = params['forget_token'];
      if (forgetToken) {
        this.rForm.patchValue({
          mode: ForgetPasswordModeEnum.EnterOtp,
          forgetToken: forgetToken
        });
      }
    });
  }

}
