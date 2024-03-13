import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, filter, map, of, switchMap, throwError, withLatestFrom } from "rxjs";
import { constantActions } from "./constant.action";
import { constantSelectors } from "./constant.selector";
import { Store } from "@ngrx/store";
import { AppState } from "../app-state";
import { ConstantService } from "src/app/auth/shared/services/constant.service";
import { GuestService } from "src/app/auth/shared/services/guest.service";

@Injectable()
export class ConstantEffetcs {
    constructor(private _Actions: Actions, private _Store: Store<AppState>,
        private _ConstantService: ConstantService , private _GuestService:GuestService) { }

    getLoginIssueTypeArr$ = createEffect(() =>
        this._Actions.pipe(ofType(constantActions.getLoginIssueTypeArr),
            withLatestFrom(this._Store.select(constantSelectors.loginIssueTypeArr)),
            filter(([action, getLoginIssueTypeArr]) => getLoginIssueTypeArr.length == 0),
            switchMap(() => {
                return this._ConstantService.getErrorsInLogin().pipe(map((result) => {
                    return constantActions.getLoginIssueTypeArrSuccess({ str: result })
                }), catchError((error) => {
                    return of(constantActions.getLoginIssueTypeArrFailure({ error }));
                }))
            })));

    getGuestIp$ = createEffect(() =>
        this._Actions.pipe(ofType(constantActions.getGuestIp),
            withLatestFrom(this._Store.select(constantSelectors.guestIp)),
            filter(([action, gueastIp]) => gueastIp == null),
            switchMap(() => {
                return this._GuestService.getGuestIpAddress().pipe(map((result:any) => {
                    return constantActions.getGuestIpSuccess({ ip: result.ip })
                }))
            })));
}