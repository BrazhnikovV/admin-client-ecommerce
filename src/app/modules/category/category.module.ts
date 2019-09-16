'use strict';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryRoutingModule } from './category-routing.module';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../../shared/shared.module';
import { CreateComponent } from './components/create/create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { UpdateComponent } from './components/update/update.component';
import { ConfirmDialogModule } from 'primeng/primeng';
import { InputTextareaModule } from 'primeng/inputtextarea';

/**
 * @classdesc - CategoryModule функциональный модуль работы с категориями
 */
@NgModule({
  declarations: [HomeComponent, CreateComponent, UpdateComponent],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    ButtonModule,
    ConfirmDialogModule,
    ReactiveFormsModule,
    InputTextareaModule,
    CategoryRoutingModule
  ]
})
export default class CategoryModule { }
