import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { AppState } from 'src/app/core/states/app-state';
import { SharedDataState } from 'src/app/core/states/shared-data/shared-data.reducer';
import { sharedDataSelectors } from 'src/app/core/states/shared-data/shared-data.selector';

export const authGuard: CanActivateChildFn = (childRoute, state) => {
  const _store: Store<AppState> = inject(Store<AppState>);
  const _router: Router = inject(Router);

  return _store.select(sharedDataSelectors.token).pipe(map(x => {
    if (x == null) {
      _router.navigate(['login'], { queryParams: { returnUrl: state.url } });
    }
    return x != null;
  }))
};
