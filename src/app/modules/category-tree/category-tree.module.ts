import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryTreeRoutingModule } from './category-tree-routing.module';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    ButtonModule,
    ConfirmDialogModule,
    ReactiveFormsModule,
    CategoryTreeRoutingModule
  ]
})
export default class CategoryTreeModule { }
