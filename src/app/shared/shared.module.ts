'use strict';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './components';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ValidatorMessageComponent } from './components/validator-message/validator-message.component';
import { MessageModule } from 'primeng/message';

/**
 * @classdesc - SharedModule обобщающий модуль для работы с общими компонентами
 */
@NgModule({
  imports: [
    TableModule,
    ButtonModule,
    CommonModule,
    MessageModule
  ],
  declarations: [ListComponent, ValidatorMessageComponent],
  exports: [ListComponent, ValidatorMessageComponent]
})
export class SharedModule { }
