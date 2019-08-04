'use strict';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CreateComponent } from './components/create/create.component';
import {UpdateComponent} from './components/update/update.component';

/**
 * @var routes: Routes - массив маршрутов модуля
 */
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {'breadCrumbName': 'Список категорий'},
    //  canActivate:[AppGuard]
  },
  {
    path: 'create',
    component: CreateComponent,
    data: {'breadCrumbName': 'Создать категорию'},
    //  canActivate:[AppGuard]
  },
  {
    path: 'edit/:id',
    component: UpdateComponent,
    data: {'breadCrumbName': 'Редактировать категорию'},
    //  canActivate:[AppGuard]
  }
];

/**
 * @classdesc - CategoryRoutingModule модуль для
 * работы с маршрутами в рамках модуля Category
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
