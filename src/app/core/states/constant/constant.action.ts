import { createAction, props } from "@ngrx/store";
import { LoginIssueTypeEntityNgrxModel } from "../entities/login-issue-type.entity";

const getLoginIssueTypeArr = createAction(' [Get Constant] get Login Issue Type Arr');
const getLoginIssueTypeArrSuccess = createAction(' [Get Constant] get Login Issue Type Arr Success', props<{ str: any }>());
const getLoginIssueTypeArrFailure = createAction(' [Get Constant] get Login Issue Type Arr Failure', props<{ error: any }>());
const setLoginIssueTypeArr = createAction(' [Set Constant] set Login Issue Type Arr', props<{ loginIssueTypeArr: LoginIssueTypeEntityNgrxModel[] }>());
const getGuestIp = createAction(' [Get Constant] get Guest Ip');
const getGuestIpSuccess = createAction(' [Get Constant] get Guest Ip Success', props<{ ip: any }>());

export const constantActions = {
    getLoginIssueTypeArr,
    getLoginIssueTypeArrSuccess,
    getLoginIssueTypeArrFailure,
    setLoginIssueTypeArr ,
    getGuestIp ,
    getGuestIpSuccess
};