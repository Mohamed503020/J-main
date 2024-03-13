import { ReturnStatement } from '@angular/compiler';
import { AfterViewInit, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/states/app-state';
import { sharedDataSelectors } from 'src/app/core/states/shared-data/shared-data.selector';
import { ThemeDirectionEnum } from 'src/app/shared/enums/theme-direction.enum';
declare var $ :any;

@Component({
  selector: 'app-drawer-chat',
  templateUrl: './drawer-chat.component.html',
  styleUrls: ['./drawer-chat.component.scss']
})
export class DrawerChatComponent implements AfterViewInit {

  selectedLanguage$ = this._Store.select(sharedDataSelectors.selectedLanguage);

  get themeDirectionEnum(){
    return ThemeDirectionEnum;
  }

  constructor(private _Store: Store<AppState>){
  }

  ngAfterViewInit(): void {
  
  }

}
