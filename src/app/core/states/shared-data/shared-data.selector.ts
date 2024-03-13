import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SharedDataState } from "./shared-data.reducer";
import { AppState } from "../app-state";
import { LanguageDto } from "src/app/shared/dtos/language.dto";

const sharedDataState = (state: AppState) => state.sharedData;

const currentUser = createSelector(sharedDataState,
  (state: SharedDataState) => state.currentUser
);

const token = createSelector(sharedDataState,
  (state: SharedDataState) => state.token
);

const languageArr = createSelector(sharedDataState,
  (state: SharedDataState) => state.languageArr
);

const currentPageTitle = createSelector(sharedDataState,
  (state: SharedDataState) => state.currentPageTitle
);

const selectedLanguage = createSelector(sharedDataState,
  (state: SharedDataState) => {
      return state.languageArr.find(x => x.id == state.selectedLanguageId) as LanguageDto;
  }
);

export const sharedDataSelectors = {
  currentUser,
  token,
  currentPageTitle,
  languageArr ,
  selectedLanguage
}
