import { createSelector } from "@ngrx/store";
import { AppState } from "../app-state";
import { ConstantState } from "./constant.reducer";
import { LoginIssueTypeEntityAdapter } from "../entities/login-issue-type.entity";

const constantState = (state: AppState) => state.constant;

const loginIssueTypeArr = createSelector(constantState,
    (state: ConstantState) => LoginIssueTypeEntityAdapter.getSelectors().selectAll(state.loginIssueTypeArr)
);

const selectedLoginIssueType = createSelector(constantState,
    (state: ConstantState, props: { id: any }) => {
        if (props.id != null) {
            var obj = LoginIssueTypeEntityAdapter.getSelectors().selectAll(state.loginIssueTypeArr).find(x => x.id === props.id);
            return obj;
        }
        return null;
    }
);

const selectedLoginIssueTypeDetail = createSelector(constantState,
    (state: ConstantState, props: { lvl1Id: any ,lvl2Id :any}) => {
        if (props.lvl1Id != null && props.lvl2Id != null) {
            var obj = LoginIssueTypeEntityAdapter.getSelectors().selectAll(state.loginIssueTypeArr).find(x => x.id === props.lvl1Id);
            return obj?.details.find(x=>x.id === props.lvl2Id);
        }
        return null;
    }
);

const guestIp = createSelector(constantState,
    (state: ConstantState) => state.guestIp
);

const preferredPhoneCountries = createSelector(constantState,
    (state: ConstantState) => state.preferredPhoneCountries
);

export const constantSelectors = {
    loginIssueTypeArr,
    selectedLoginIssueType ,
    selectedLoginIssueTypeDetail ,
    guestIp ,
    preferredPhoneCountries
}