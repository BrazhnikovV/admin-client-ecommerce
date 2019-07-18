'use strict';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './components';

/**
 * @classdesc - SharedModule обобщающий модуль для работы с общими компонентами
 */
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ListComponent],
  exports: [ListComponent]
})
export class SharedModule { }
