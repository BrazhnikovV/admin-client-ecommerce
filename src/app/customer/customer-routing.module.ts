'use strict';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    // data: {'breadCrumbName': 'Главная'},
    //  canActivate:[AppGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [ListComponent]
})
export class CustomerRoutingModule { }
