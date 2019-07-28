import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CreateComponent } from './components/create/create.component';
import { UpdateComponent } from '../product/components/update/update.component';

/**
 * @var routes: Routes - массив маршрутов модуля
 */
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {'breadCrumbName': 'Список продуктов'}
  },
  {
    path: 'create',
    component: CreateComponent,
    data: {'breadCrumbName': 'Создать продукт'}
  },
  {
    path: 'edit/:id',
    component: UpdateComponent,
    data: {'breadCrumbName': 'Редактировать продукт'}
  }
];

/**
 * @classdesc - ProductRoutingModule модуль для
 * работы с маршрутами в рамках модуля product
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
