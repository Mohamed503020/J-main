import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { SubSink } from 'subsink';
import { LogInIssuesFormInterface } from './forms-interface/log-in-issues.form-interface';
import { StaticDataLogIssuesDto } from '../shared/dtos/log-in-issues.dto';
import { toggleFade } from '../shared/animations/toggle-fide';
import { ConstantService } from '../shared/services/constant.service';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { AppState } from 'src/app/core/states/app-state';
import { AccountService } from '../shared/services/account.service';
import { LoginIssueTypeEntityNgrxModel } from 'src/app/core/states/entities/login-issue-type.entity';
import { constantActions } from 'src/app/core/states/constant/constant.action';
import { constantSelectors } from 'src/app/core/states/constant/constant.selector';
import { filter, map, takeWhile, withLatestFrom } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
declare var $ :any;
@Component({
  selector: 'app-log-in-issues',
  templateUrl: './log-in-issues.component.html',
  styleUrls: ['./log-in-issues.component.scss'],
  animations: [toggleFade]
})
export class LogInIssuesComponent implements OnInit , OnDestroy {

  private subs = new SubSink();

  rForm?: FormGroup<LogInIssuesFormInterface>;
  loginTypeIssueArr$ = this._Store.select(constantSelectors.loginIssueTypeArr);
  selectedLoginIssueType$ = this._Store.select(s => constantSelectors.selectedLoginIssueType(s, { id: null }));
  selectedLoginIssueTypeDetail$ = this._Store.select(s => constantSelectors.selectedLoginIssueTypeDetail(s, { lvl1Id: null, lvl2Id: null }));
  guestIp$ = this._Store.select(constantSelectors.guestIp);

  get fCtrls() {
    return this.rForm!.controls;
  }

  get getLvl2() {
    return this.rForm!.controls;
  }

  constructor(private _FormBuilder: FormBuilder, private _ConstantService: ConstantService,
    private _ToastrService: ToastrService, private _Store: Store<AppState>, private _Actions: Actions) {
    this.rForm = this._FormBuilder.group<LogInIssuesFormInterface>({
      loginIssueLvl1: new FormControl(null),
      loginIssueLvl2: new FormControl(null),
    });

    this.fCtrls.loginIssueLvl2.valueChanges.subscribe((value) => {
      if(value){
        $('.logo__container').addClass('d-none');
      }else{
        $('.logo__container').removeClass('d-none');
      }
    })

    this.selectedLoginIssueType$ = this._Store.select(s => constantSelectors.selectedLoginIssueType(s, { id: this.fCtrls.loginIssueLvl1.value }));
    this.selectedLoginIssueTypeDetail$ = this._Store.select(s => constantSelectors.selectedLoginIssueTypeDetail(s,
      { lvl1Id: this.fCtrls.loginIssueLvl1.value, lvl2Id: this.fCtrls.loginIssueLvl2.value }));
  }

  ngOnDestroy(): void {
   $('.logo__container').removeClass('d-none');
  }


  ngOnInit(): void {
    this._Actions.pipe(ofType(constantActions.getLoginIssueTypeArrSuccess)).subscribe((res) => {
      this.getOptions(res);
    });

    this._Actions.pipe(ofType(constantActions.getLoginIssueTypeArrFailure)).subscribe((res) => {
      let cleanedJsonString = res.error.error?.text?.replace(/\n/g, '');
      //! remove last char because it cause error when parse it
      cleanedJsonString = cleanedJsonString.slice(0, -1);

      try {
        this.getOptions(JSON.parse(cleanedJsonString));
      } catch (error) {
        this._ToastrService.error('حدث خطأ اثناء تحميل البيانات');
      }
    });

    this._Store.dispatch(constantActions.getLoginIssueTypeArr());
    this._Store.dispatch(constantActions.getGuestIp());
  }

  onChangeloginTypeIssueLvl1(item: LoginIssueTypeEntityNgrxModel) {
    this.fCtrls.loginIssueLvl1.setValue(item.id);
  }

  onChangeloginTypeIssueLvl2(id: any) {
    this.fCtrls.loginIssueLvl2.setValue(id);
  }

  onBackLvl1() {
    this.fCtrls.loginIssueLvl1.setValue(null);
  }

  onBackLvl2() {
    this.fCtrls.loginIssueLvl2.setValue(null);
  }

  private getOptions(optionsObj: any) {
    console.log(optionsObj);
    var loginIssueTypeArr: LoginIssueTypeEntityNgrxModel[] = [];
    Object.entries(optionsObj).forEach(([lvl1, lvl2]) => {
      var loginIssueTypeObj: LoginIssueTypeEntityNgrxModel = { name: lvl1, id: loginIssueTypeArr.length, details: [] };

      for (const [value, name] of Object.entries(lvl2 as any)) {
        loginIssueTypeObj.details.push({ name: name as string, id: value });
      }

      loginIssueTypeArr.push(loginIssueTypeObj);
    });

    this._Store.dispatch(constantActions.setLoginIssueTypeArr({ loginIssueTypeArr }));
  }

}
