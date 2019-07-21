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
    data: {'breadCrumbName': 'Список продуктов'},
    //  canActivate:[AppGuard]
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
