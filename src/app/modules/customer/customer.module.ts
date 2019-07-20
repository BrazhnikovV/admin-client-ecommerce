'use strict';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CreateComponent } from './components/create/create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import { UpdateComponent } from './components/update/update.component';

/**
 * @classdesc - AppModule функциональный модуль для работы с пользователями
 */
@NgModule({
  declarations: [CreateComponent, UpdateComponent],
  imports: [
    FormsModule,
    ButtonModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    CustomerRoutingModule
  ],
})
// Необходимо добавить default
export default class CustomerModule { }
