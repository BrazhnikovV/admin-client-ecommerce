'use strict';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Error404Component } from '../layout/error404/error404.component';

/**
 * @var routes: Routes - маршруты приложения
 */
const routes: Routes = [
  {
    path: 'customers',
    loadChildren: 'src/app/modules/customer/customer.module',
    data: {'breadCrumbName': 'Пользователи'},
    //  canActivate:[AppGuard]
  },
  {
    path: 'addresses',
    loadChildren: 'src/app/modules/address/address.module',
    data: {'breadCrumbName': 'Адреса'},
    //  canActivate:[AppGuard]
  },
  {
    path: 'credit-cards',
    loadChildren: 'src/app/modules/credit-card/credit-card.module',
    data: {'breadCrumbName': 'Кредитные карты'},
    //  canActivate:[AppGuard]
  },
  {
    path: 'orders',
    loadChildren: 'src/app/modules/order/order.module',
    data: {'breadCrumbName': 'Зазазы'},
    //  canActivate:[AppGuard]
  },
  {
    path: 'invoices',
    loadChildren: 'src/app/modules/invoice/invoice.module',
    data: {'breadCrumbName': 'Счет фактуры'},
    //  canActivate:[AppGuard]
  },
  {
    path: 'shipments',
    loadChildren: 'src/app/modules/shipment/shipment.module',
    data: {'breadCrumbName': 'Достава'},
    //  canActivate:[AppGuard]
  },
  {
    path: 'products',
    loadChildren: 'src/app/modules/product/product.module',
    data: {'breadCrumbName': 'Продукты'},
    //  canActivate:[AppGuard]
  },
  {
    path: 'categories',
    loadChildren: 'src/app/modules/category/category.module',
    data: {'breadCrumbName': 'Категории'},
    //  canActivate:[AppGuard]
  },
  {
    path: 'categories-tree',
    loadChildren: 'src/app/modules/category-tree/category-tree.module',
    data: {'breadCrumbName': 'Категории'},
    //  canActivate:[AppGuard]
  },
  { path: '**', component: Error404Component },
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
