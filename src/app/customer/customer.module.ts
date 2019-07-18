'use strict';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';
import { SharedModule } from '../shared/shared.module';

/**
 * @classdesc - AppModule функциональный модуль для работы с пользователями
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    CustomerRoutingModule
  ],
})
// Необходимо добавить default
export default class CustomerModule { }
