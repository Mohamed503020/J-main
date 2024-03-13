import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { sharedDataActions } from './core/states/shared-data/shared-data.action';
import { Store } from '@ngrx/store';
import { DOCUMENT } from '@angular/common';
import { ThemeDirectionEnum } from './shared/enums/theme-direction.enum';
import { Actions, ofType } from '@ngrx/effects';
import { distinctUntilChanged, filter, withLatestFrom } from 'rxjs';
import { LanguageDto } from './shared/dtos/language.dto';
import { sharedDataSelectors } from './core/states/shared-data/shared-data.selector';
import { AppState } from './core/states/app-state';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'j-main-app';
  setSelectedLanguageId!: number;
  cssFileIdArr :string[] = [];

  constructor(private _Store: Store<AppState>, private renderer: Renderer2
    , @Inject(DOCUMENT) private document: Document, private _Actions: Actions ,
    private _Router: Router , private _ActivatedRoute:ActivatedRoute) {

    this.loadLanguageArr();

    this._Actions.pipe(ofType(sharedDataActions.setSelectedLanguageId)).pipe(distinctUntilChanged()
      , withLatestFrom(this._Store.select(sharedDataSelectors.selectedLanguage))).subscribe(([action, selectedLanguage]) => {
        if (this.setSelectedLanguageId != action.languageId) {
          if (selectedLanguage?.dir == ThemeDirectionEnum.Rtl) {
            $('html').attr('dir', 'rtl');
            $('html').attr('direction', 'rtl');
            $("html").css({ direction: "rtl" });
          } else {
            $('html').attr('dir', null);
            $('html').attr('direction', null);
            $("html").css({ direction: '' });
          }
          this.setThemeDirection(selectedLanguage?.dir!);
        }
      });

    

    this.loadUser();
    this.loadTheme();
  }

  ngOnInit(): void {
    if (this._Router.navigated) {
      this.getCurrentRoute(this._ActivatedRoute.snapshot);
    }

    this._Router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((route) => {    
       this.getCurrentRoute(this._ActivatedRoute.snapshot);
    });
  }

  private loadUser() {
    var currentUserStorage = localStorage.getItem('user');
    if (currentUserStorage != null) {
      this._Store.dispatch(sharedDataActions.setCurrentUser({ user: JSON.parse(currentUserStorage) }));
    }

    var tokenStorage = localStorage.getItem('token');
    if (tokenStorage != null) {
      this._Store.dispatch(sharedDataActions.setToken({ token: tokenStorage }));
    }
  }

  private loadTheme() {
    var languageIdStorage: any = localStorage.getItem('languageId');
    if (languageIdStorage != null) {
      this._Store.dispatch(sharedDataActions.setSelectedLanguageId({ languageId: Number(languageIdStorage) }));
    } else {
      this._Store.dispatch(sharedDataActions.setSelectedLanguageId({ languageId: 1 }));
    }
  }

  private setThemeDirection(themeDir: ThemeDirectionEnum) {
    var cssFile = [`./assets/css/style.bundle${themeDir == ThemeDirectionEnum.Rtl ? '.rtl' : ''}.css`,
    `./assets/plugins/global/plugins.bundle${themeDir == ThemeDirectionEnum.Rtl ? '.rtl' : ''}.css`]

    const removedCssFileIdArr = [ ...this.cssFileIdArr];
    this.cssFileIdArr = [];
    for (let index = 0; index < cssFile.length; index++) {
      const element = cssFile[index];
      var style = this.renderer.createElement('link') as HTMLLinkElement;

      this.renderer.setProperty(style, 'rel', 'stylesheet');
      this.renderer.setProperty(style, 'href', element);

      const fileId =  `theme-${themeDir}-${index}`;
      this.cssFileIdArr.push(fileId);
      this.renderer.setProperty(style, 'id',fileId);

      this.renderer.appendChild(this.document.head, style);
    }

    setTimeout(() => {
      this.removeExistingThemeStyle(removedCssFileIdArr);
    }, 500);
  }

  private loadLanguageArr() {
    var languageArr: LanguageDto[] = [
      { id: 1, name: "English", country: 'united-states', dir: ThemeDirectionEnum.Ltr },
      { id: 2, name: "اللغه العربيه", country: 'saudi-arabia', dir: ThemeDirectionEnum.Rtl }
    ]
    this._Store.dispatch(sharedDataActions.setLanguageArr({ languageArr }));
  }

 private removeExistingThemeStyle(removedCssFileIdArr: string[]) {
  console.log(removedCssFileIdArr);
    if (removedCssFileIdArr.length > 0) {
      for (let index = 0; index < removedCssFileIdArr.length; index++) {
        const element = this.document.getElementById(removedCssFileIdArr[index]);
        this.renderer.removeChild(this.document.head, element);
      }
    }

    const themeClassElem = this.document.getElementsByClassName(`initial-theme`);
    if (themeClassElem?.length > 0) {
      for (let index = 0; index < themeClassElem.length; index++) {
        this.renderer.removeChild(this.document.head, themeClassElem[index]);
      }
    }
  }

   private getCurrentRoute(currentRoute: ActivatedRouteSnapshot): any {
    if (currentRoute != null) {
  
      if (currentRoute.firstChild != null) {
        return this.getCurrentRoute(currentRoute.firstChild);
      }else{
        this._Store.dispatch(sharedDataActions.currentPageTitle({ title: currentRoute.data['pageTitle'] }));
      }
    }
  }
}
