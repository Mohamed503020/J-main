import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { get } from 'scriptjs';
import { TemplateConfigSetting } from '../shared/settings/template-config.setting';
declare var $: any;
@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit, AfterViewInit {

  constructor(private renderer: Renderer2
    , @Inject(DOCUMENT) private document: Document, private _Actions: Actions,
    private _TemplateConfigSetting: TemplateConfigSetting) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this._TemplateConfigSetting.reloadTemplateJs();
  }

}
