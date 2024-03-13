import { createReducer, on } from "@ngrx/store";
import { UserDto } from "src/app/auth/shared/dtos/user.dto";
import { sharedDataActions } from "./shared-data.action";
import { ThemeDirectionEnum } from "src/app/shared/enums/theme-direction.enum";
import { LanguageDto } from "src/app/shared/dtos/language.dto";

export class SharedDataState {
    token!: string | null;
    currentUser!: UserDto | null;
    languageArr!: LanguageDto[];
    selectedLanguageId!: number | null;
    currentPageTitle!: any; 
}

export const initialSharedDataState: SharedDataState = {
    token: null,
    currentUser: null,
    languageArr: [],
    selectedLanguageId: null ,
    currentPageTitle: null
}

const _sharedDataReducer = createReducer(
    initialSharedDataState,
    on(sharedDataActions.setCurrentUser, (state, params) => {
        return {
            ...state,
            currentUser: params.user
        }
    }),
    on(sharedDataActions.setToken, (state, params) => {
        return {
            ...state,
            token: params.token
        }
    }),
    on(sharedDataActions.setLanguageArr, (state, params) => {
        return {
            ...state,
            languageArr: params.languageArr
        }
    }),
    on(sharedDataActions.setSelectedLanguageId, (state, params) => {
        return {
            ...state,
            selectedLanguageId: params.languageId
        }
    }),
    on(sharedDataActions.currentPageTitle, (state, params) => {
        return {
            ...state,
            currentPageTitle: params.title
        }
    }),
    on(sharedDataActions.logout, (state, params) => {
        return {
            ...state,
            token: null,
            currentUser: null,
        }
    }),
    on(sharedDataActions.getUserProfile, (state, params) => {
        return {
            ...state
        }
    }),
    on(sharedDataActions.clearTokenAndCurrentUser, (state, params) => {
        return {
            ...state ,
            currentUser:null,
            token:null
        }
    })
);

export function sharedDataReducer(state: any, action: any) {
    return _sharedDataReducer(state, action);
}
