import { createReducer, on } from "@ngrx/store";
import { LoginIssueTypeEntityAdapter, LoginIssueTypeEntityNgrxModel, LoginIssueTypeEntityState } from "../entities/login-issue-type.entity";
import { constantActions } from "./constant.action";
import { CountryISO } from "ngx-intl-tel-input";

export interface ConstantState {
    loginIssueTypeArr: LoginIssueTypeEntityState;
    guestIp: any;
    preferredPhoneCountries: CountryISO[]
}

export const initialConstantState: ConstantState = {
    loginIssueTypeArr: LoginIssueTypeEntityAdapter.getInitialState() ,
    guestIp: null ,
    preferredPhoneCountries : [CountryISO.SaudiArabia, CountryISO.Egypt]
}

export const _constantReducer = createReducer(
    initialConstantState,
    on(constantActions.getLoginIssueTypeArr, (state) => {
        return { ...state };
    }),
    on(constantActions.setLoginIssueTypeArr, (state, params) => {
        return { ...state, loginIssueTypeArr: LoginIssueTypeEntityAdapter.setAll(params.loginIssueTypeArr, state.loginIssueTypeArr) };
    }),
    on(constantActions.getLoginIssueTypeArrFailure, (state, params) => {
        return { ...state };
    }),
    on(constantActions.getLoginIssueTypeArrSuccess, (state, params) => {
        return { ...state };
    }),
    on(constantActions.getGuestIp, (state, params) => {
        return { ...state };
    }),
    on(constantActions.getGuestIpSuccess, (state, params) => {
        return { ...state ,
            guestIp: params.ip};
    })
)

export function constantReducer(state: any, action: any) {
    return _constantReducer(state, action)
} 