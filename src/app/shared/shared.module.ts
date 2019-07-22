'use strict';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './components';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ValidatorMessageComponent } from './components/validator-message/validator-message.component';
import { MessageModule } from 'primeng/message';
import { RouterModule } from '@angular/router';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressComponent } from './components/progress/progress.component';

/**
 * @classdesc - SharedModule обобщающий модуль для работы с общими компонентами
 */
@NgModule({
  imports: [
    TableModule,
    ButtonModule,
    CommonModule,
    MessageModule,
    RouterModule,
    ProgressBarModule
  ],
  declarations: [ListComponent, ValidatorMessageComponent, ProgressComponent],
  exports: [ListComponent, ValidatorMessageComponent, ProgressComponent]
})
export class SharedModule { }
