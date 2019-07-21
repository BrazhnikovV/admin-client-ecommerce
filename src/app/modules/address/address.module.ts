'use strict';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { AddressRoutingModule } from './address-routing.module';
import { HomeComponent } from './components/home/home.component';

/**
 * @classdesc - AddressModule функциональный модуль
 * для работы с адресами пользователей
 */
@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    AddressRoutingModule
  ]
})
export default class AddressModule { }
