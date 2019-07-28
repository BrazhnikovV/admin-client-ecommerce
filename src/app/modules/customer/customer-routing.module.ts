'use strict';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './components/create/create.component';
import { UpdateComponent } from './components/update/update.component';
import { HomeComponent } from './components/home/home.component';

/**
 * @var routes: Routes - массив маршрутов модуля
 */
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {'breadCrumbName': 'Список пользователей'},
    //  canActivate:[AppGuard]
  },
  {
    path: 'create',
    component: CreateComponent,
    data: {'breadCrumbName': 'Создать пользователя'}
  },
  {
    path: 'edit/:id',
    component: UpdateComponent,
    data: {'breadCrumbName': 'Редактировать пользователя'}
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
