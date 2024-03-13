import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs';
import { AppState } from 'src/app/core/states/app-state';
import { sharedDataSelectors } from 'src/app/core/states/shared-data/shared-data.selector';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit , AfterViewInit {

  pageTitle!: string;
  selectedLanguage$ = this._Store.select(sharedDataSelectors.selectedLanguage);

  constructor(private _Store: Store<AppState>, private _ActivatedRoute: ActivatedRoute,
    private _Router: Router) {
  
  }
  
  ngOnInit(): void {
   if (this._Router.navigated) {
      var currentRoute = this.getCurrentRouteInf(this._ActivatedRoute.snapshot);
      this.pageTitle = currentRoute.data['pageTitle'];
    }

    this._Router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((route) => {
      var currentRoute = this.getCurrentRouteInf(this._ActivatedRoute.snapshot);
      this.pageTitle = currentRoute.data['pageTitle'];
    });
  }

  ngAfterViewInit(): void {

  }

   private getCurrentRouteInf(currentRoute: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
    if (currentRoute.firstChild == null) {
      return currentRoute;
    } else {
      return this.getCurrentRouteInf(currentRoute.firstChild);
    }
  }
}
