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
    data: {'breadCrumbName': 'Кредитные карта'},
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
