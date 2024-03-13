import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, map, catchError, throwError, finalize } from "rxjs";
import { sharedDataSelectors } from "../states/shared-data/shared-data.selector";
import { AppState } from "../states/app-state";
import { sharedDataActions } from "../states/shared-data/shared-data.action";
import { GlobalErrorCodesEnum } from "src/app/shared/enums/global-error-codes.enum";
import { NgxUiLoaderService } from "ngx-ui-loader";



@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {

  token: string| null = null;

  constructor( private _Store: Store<AppState>, private _Router: Router ,
    private _NgxUiLoaderService: NgxUiLoaderService) {
    this._Store.select(sharedDataSelectors.token).subscribe((token) => {
      this.token = token;
    });
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    if (this.token) {
      request = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${this.token}`
        }
      });
    }
    this._NgxUiLoaderService.start();

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }), catchError((error: HttpErrorResponse) => {
        if (error.status == 401) {
          this._Store.dispatch(sharedDataActions.logout());
          this._Router.navigateByUrl("/login")
        } 
        else if (error.error?.code == 302 && error.error?.form_code == GlobalErrorCodesEnum.setMobileCode) {
          this._Router.navigate(["active-code"], {
            queryParams: {
              type: "phone",
            },
          })
        } else if (error.error?.code == 302 && error.error?.form_code == GlobalErrorCodesEnum.setEmailCode) {
          this._Router.navigate(["active-code"], {
            queryParams: {
              type: "email",
            },
          })
        } 
        else if (error.error?.code == 302 && error.error?.form_code == GlobalErrorCodesEnum.ipNotValid) {
          this._Router.navigate(["not-valid-ip"])
        } 
         else if (error.error?.code == 302 && error.error?.form_code == GlobalErrorCodesEnum.setMobileCodeSubAccount) {
          this._Router.navigate(["active-code"], {
            queryParams: {
              type: "phone",
              subAccount: true,
            },
          })
        } 

        this._NgxUiLoaderService.stop();
        return throwError(error);
      }), finalize(() => {
       this._NgxUiLoaderService.stop();
      }));

  };
}
