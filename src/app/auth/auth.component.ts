import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { AppState } from '../core/states/app-state';
import { sharedDataSelectors } from '../core/states/shared-data/shared-data.selector';
import { AccountService } from './shared/services/account.service';
import { AuthService } from './shared/services/auth.service';
import { sharedDataActions } from '../core/states/shared-data/shared-data.action';
import { ThemeDirectionEnum } from '../shared/enums/theme-direction.enum';
import { map } from 'rxjs';
import { TemplateConfigSetting } from '../shared/settings/template-config.setting';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy, AfterViewInit {
  languageArr$ = this._Store.select(sharedDataSelectors.languageArr);
  selectedLanguage$ = this._Store.select(sharedDataSelectors.selectedLanguage);
  currentPageTitle$ = this._Store.select(sharedDataSelectors.currentPageTitle);

  get isLogin() {
    return this._Store.select(sharedDataSelectors.currentPageTitle).pipe(map((x:string) => x?.toLocaleLowerCase() == 'login'));
  }

  get themeDirectionEnum() {
    return ThemeDirectionEnum;
  }

  constructor(private _FormBuilder: FormBuilder, private _AuthService: AuthService,
    private _ToastrService: ToastrService, private _ActivatedRoute: ActivatedRoute,
    private _AccountService: AccountService, private _Router: Router, private _Store: Store<AppState>,
    private renderer: Renderer2, @Inject(DOCUMENT) private document: Document ,
    private _TemplateConfigSetting:TemplateConfigSetting) {
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
   this._TemplateConfigSetting.reloadTemplateJs();
  }

  onChangeLanguage(id: number) {
    this._Store.dispatch(sharedDataActions.setSelectedLanguageId({ languageId: id }));
  }

  onRedirectToLogin() {
    this._Router.navigate(['/login']);
  }
}
