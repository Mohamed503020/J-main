import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";



export function selectId(a: LoginIssueTypeEntityNgrxModel) {
    return a.id;
}

export const LoginIssueTypeEntityAdapter: EntityAdapter<LoginIssueTypeEntityNgrxModel> =
    createEntityAdapter<LoginIssueTypeEntityNgrxModel>({
        selectId: selectId
    });

export interface LoginIssueTypeEntityState extends EntityState<LoginIssueTypeEntityNgrxModel> { }

export interface LoginIssueTypeEntityNgrxModel {
    id: any;
    name: string;
    details: DetailChildOfLoginIssueTypeEntityNgrxModel[];
}

export interface DetailChildOfLoginIssueTypeEntityNgrxModel {
    id: any;
    name: string;
}