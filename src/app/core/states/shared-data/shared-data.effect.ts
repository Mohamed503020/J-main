import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { withLatestFrom, filter, switchMap, map } from "rxjs";
import { sharedDataActions } from "./shared-data.action";
import { AppState } from "../app-state";
import { Store } from "@ngrx/store";
import { sharedDataSelectors } from "./shared-data.selector";
import { AccountService } from "src/app/auth/shared/services/account.service";
import { TemplateConfigSetting } from "src/app/shared/settings/template-config.setting";

@Injectable()
export class SharedDataEffetcs {
    constructor(private _Actions: Actions , private _AccountService:AccountService ,
        private _Store:Store<AppState> , private _TemplateConfigSetting:TemplateConfigSetting) { }

    setToken$ = createEffect(() =>
        this._Actions.pipe(ofType(sharedDataActions.setToken), map((result) => {
            localStorage.setItem('token', result.token);
            return result;
        })), { dispatch: false });

    setCurrentUser$ = createEffect(() =>
        this._Actions.pipe(ofType(sharedDataActions.setCurrentUser), map((result) => {
            localStorage.setItem('user', JSON.stringify(result.user));
            return result;
        })), { dispatch: false });

    setThemeId$ = createEffect(() =>
        this._Actions.pipe(ofType(sharedDataActions.setSelectedLanguageId), map((result) => {
            localStorage.setItem('languageId', JSON.stringify(result.languageId));
            return result;
        })), { dispatch: false });

    logout$ = createEffect(() =>
        this._Actions.pipe(ofType(sharedDataActions.logout), map((result) => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            this._TemplateConfigSetting.drawerHideAll();
            return result;
        })), { dispatch: false });

        getUserProfile$ = createEffect(() =>
        this._Actions.pipe(ofType(sharedDataActions.getUserProfile),
            withLatestFrom(this._Store.select(sharedDataSelectors.currentUser)),
            filter(([action, currentUser]) => currentUser == null),
            switchMap(() => {
                return this._AccountService.getUserProfileData().pipe(map(result => {
                    return sharedDataActions.setCurrentUser({ user: result })
                }))
            })));
}