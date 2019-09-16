import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../category-tree/components/home/home.component';

/**
 * @var routes: Routes - массив маршрутов модуля
 */
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {'breadCrumbName': 'дерево категорий'},
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
export class CategoryTreeRoutingModule { }
