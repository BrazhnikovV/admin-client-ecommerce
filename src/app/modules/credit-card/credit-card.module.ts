import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditCardRoutingModule } from './credit-card-routing.module';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../../shared/shared.module';

/**
 * @classdesc - CreditCardModule функциональный модуль
 * для работы с кредитными картами пользователей
 */
@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    CreditCardRoutingModule
  ]
})
export default class CreditCardModule { }
