'use strict';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryTreeRoutingModule } from './category-tree-routing.module';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ButtonModule } from 'primeng/button';
import { TreeModule } from 'primeng/tree';
import { DialogModule } from 'primeng/dialog';
import { ModalFormComponent } from './components/modal-form/modal-form.component';

/**
 * @classdesc - CategoryTreeModule функциональный модуль работы с деревом категорий
 */
@NgModule({
  declarations: [HomeComponent, ModalFormComponent],
  imports: [
    TreeModule,
    FormsModule,
    CommonModule,
    SharedModule,
    ButtonModule,
    DialogModule,
    ReactiveFormsModule,
    CategoryTreeRoutingModule
  ]
})
export default class CategoryTreeModule { }
