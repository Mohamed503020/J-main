import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserDto } from 'src/app/auth/shared/dtos/user.dto';
import { AppState } from 'src/app/core/states/app-state';
import { sharedDataActions } from 'src/app/core/states/shared-data/shared-data.action';
import { sharedDataSelectors } from 'src/app/core/states/shared-data/shared-data.selector';
import { ThemeDirectionEnum } from 'src/app/shared/enums/theme-direction.enum';
import { SidebarFormInterface } from '../../shared/form-interfaces/sidebar.form-interface';
import { MenuTypeEnum } from '../../shared/enums/menu-type.enum';
declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements AfterViewInit {

  rForm!: FormGroup<SidebarFormInterface>;

  selectedLanguage$ = this._Store.select(sharedDataSelectors.selectedLanguage);
  user$ = this._Store.select(sharedDataSelectors.currentUser);

  get themeDirectionEnum() {
    return ThemeDirectionEnum;
  }

  get menuTypeEnum() {
    return MenuTypeEnum;
  }

  get fCtrls(){
    return this.rForm.controls;
  }

  constructor(private _Store: Store<AppState>, private _Router: Router,
    private _FormBuilder: FormBuilder) {
      this.rForm = this._FormBuilder.group<SidebarFormInterface>({
        menuId: new FormControl(null)
      });
  }

  ngAfterViewInit() {
   
  }

  onLogout() {
    this._Store.dispatch(sharedDataActions.logout());
    this._Router.navigateByUrl('/login');
  }

  onChangeSelectedMenu(item:MenuTypeEnum){
    this.rForm.controls.menuId.setValue(item);
    setTimeout(() => {
      $('#kt_app_sidebar_secondary_toggle').removeClass('active');
      $('body').removeAttr('data-kt-app-sidebar-secondary-collapse')
    }, 100);
  }

}
