import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { APP_BASE_HREF, HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app.routing';
import { AuthModule } from './auth/auth.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CoreModule } from './core/core.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { RecaptchaModule } from "ng-recaptcha";
import { sharedDataReducer } from './core/states/shared-data/shared-data.reducer';
import { SharedDataEffetcs } from './core/states/shared-data/shared-data.effect';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthHttpInterceptor } from './core/interceptors/auth-http-interceptor';
import { SmsLibModule } from '4j-sms-lib';
import { FeaturesModule } from './features/features.module';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { NgSelectModule } from '@ng-select/ng-select';
import { constantReducer } from './core/states/constant/constant.reducer';
import { ConstantEffetcs } from './core/states/constant/constant.effect';
import { NgxUiLoaderConfig, NgxUiLoaderModule } from "ngx-ui-loader";
import { ngxUiLoaderConfig } from './shared/settings/ngx-ui-loader.setting';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule ,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CoreModule,
    RecaptchaModule,
    BrowserAnimationsModule,
    NgxIntlTelInputModule,
    NgSelectModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    ToastrModule.forRoot(),
    StoreModule.forRoot({
      sharedData: sharedDataReducer ,
      constant :constantReducer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: true,
    }), EffectsModule.forRoot([SharedDataEffetcs , ConstantEffetcs])
  ],
  providers: [
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
