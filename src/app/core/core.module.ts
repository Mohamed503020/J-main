import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { sharedDataReducer } from './states/shared-data/shared-data.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SharedDataEffetcs } from './states/shared-data/shared-data.effect';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
