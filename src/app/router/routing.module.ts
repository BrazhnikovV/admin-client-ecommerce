'use strict';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/**
 * @var routes: Routes - маршруты приложения
 */
const routes: Routes = [
  // {
  //  path: '',
  //  component: AppComponent,
  //  data: {'breadCrumbName': 'Главная'},
  //  canActivate:[AppGuard]
  // }
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
