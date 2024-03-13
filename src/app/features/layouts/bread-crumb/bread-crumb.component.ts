import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs';
import { AppState } from 'src/app/core/states/app-state';

@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.scss']
})
export class BreadCrumbComponent implements OnInit {
  pageArr: { title: string, url: null }[] = [];

  constructor(private _ActivatedRoute: ActivatedRoute,
    private _Router: Router , private _Store:Store<AppState>) {

  }

  ngOnInit(): void {
    if (this._Router.navigated) {
      this.pageArr = [];
       this.filleBreadCrumbArr(this._ActivatedRoute.snapshot);
    }

    this._Router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((route) => {
      this.pageArr = [];
      this.filleBreadCrumbArr(this._ActivatedRoute.snapshot);
    });
  }

  private filleBreadCrumbArr(currentRoute: ActivatedRouteSnapshot): any {
    if (currentRoute != null) {
      var breadCrumb = currentRoute.data['breadCrumb'];
      if (breadCrumb) {
        this.pageArr.push({title: breadCrumb.title, url:null});
      }

      if (currentRoute.firstChild != null) {
        return this.filleBreadCrumbArr(currentRoute.firstChild);
      }
    }
  }
}
