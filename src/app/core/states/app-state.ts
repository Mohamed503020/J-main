import { ConstantState } from "./constant/constant.reducer";
import { SharedDataState } from "./shared-data/shared-data.reducer";

export interface AppState {
    sharedData: SharedDataState,
    constant: ConstantState
}