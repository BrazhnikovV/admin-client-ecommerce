import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../../shared/shared.module';

/**
 * @classdesc - ProductModule функциональный модуль
 * для работы с продуктами
 */
@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    ProductRoutingModule
  ]
})
export default class ProductModule { }
