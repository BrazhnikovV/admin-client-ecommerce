'use strict';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CreateComponent } from './components/create/create.component';

/**
 * @classdesc - AppModule функциональный модуль для работы с пользователями
 */
@NgModule({
  declarations: [CreateComponent],
  imports: [
    CommonModule,
    SharedModule,
    CustomerRoutingModule
  ],
})
// Необходимо добавить default
export default class CustomerModule { }
