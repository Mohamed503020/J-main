import { createAction, props } from "@ngrx/store";
import { UserDto } from "src/app/auth/shared/dtos/user.dto";
import { LanguageDto } from "src/app/shared/dtos/language.dto";
import { ThemeDirectionEnum } from "src/app/shared/enums/theme-direction.enum";

const setToken = createAction( '[Set User] set token', props<{ token: string }>());
const setCurrentUser = createAction( '[Set User] set Current User', props<{ user: UserDto }>());
const setLanguageArr = createAction( '[Set User] set LanguageArr', props<{ languageArr: LanguageDto[] }>());
const setSelectedLanguageId = createAction( '[Set User] set Selected Language Id', props<{ languageId: number }>());
const getUserProfile = createAction( '[Set User] get User Profile');
const currentPageTitle = createAction( 'Current Page Title  ', props<{ title: any }>());
const clearTokenAndCurrentUser = createAction( '[Set User] Clear Token And Current User');  
const logout = createAction( '[Set User] Logout');

export const sharedDataActions = {
  setToken,
  setCurrentUser ,
  setLanguageArr ,
  setSelectedLanguageId,
  getUserProfile,
  currentPageTitle,
  clearTokenAndCurrentUser,
  logout
}
