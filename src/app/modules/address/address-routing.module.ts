'use strict';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

/**
 * @var routes: Routes - массив маршрутов модуля
 */
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    // data: {'breadCrumbName': 'Главная'},
    //  canActivate:[AppGuard]
  }
];

/**
 * @classdesc - AddressRoutingModule модуль для
 * работы с маршрутами в рамках модуля address
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddressRoutingModule { }
