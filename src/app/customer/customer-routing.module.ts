'use strict';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from '../shared/components/list/list.component';

/**
 * @var routes: Routes - массив маршрутов модуля
 */
const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    // data: {'breadCrumbName': 'Главная'},
    //  canActivate:[AppGuard]
  }
];

/**
 * @classdesc - CustomerRoutingModule модуль для
 * работы с маршрутами в рамках модуля customer
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
