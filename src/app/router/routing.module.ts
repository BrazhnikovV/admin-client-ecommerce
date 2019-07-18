'use strict';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/**
 * @var routes: Routes - маршруты приложения
 */
const routes: Routes = [
   {
    path: 'customers',
    loadChildren: 'src/app/modules/customer/customer.module',
    // data: {'breadCrumbName': 'Главная'},
  //  canActivate:[AppGuard]
   }
  // { path: '**', component: Page404Component },
];

/**
 * @classdesc - RoutingModule модуль управления маршрутизацией
 */
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [RouterModule]
})
export class RoutingModule {}
