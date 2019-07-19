'use strict';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './components';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

/**
 * @classdesc - SharedModule обобщающий модуль для работы с общими компонентами
 */
@NgModule({
  imports: [
    TableModule,
    ButtonModule,
    CommonModule
  ],
  declarations: [ListComponent],
  exports: [ListComponent]
})
export class SharedModule { }
