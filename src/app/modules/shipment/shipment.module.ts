import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShipmentRoutingModule } from './shipment-routing.module';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../../shared/shared.module';

/**
 * @classdesc - ShipmentModule функциональный модуль
 * для работы с доставками пользователей
 */
@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    ShipmentRoutingModule
  ]
})
export default class ShipmentModule { }
