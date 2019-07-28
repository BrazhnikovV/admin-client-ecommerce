import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../../shared/shared.module';
import { CreateComponent } from './components/create/create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { UpdateComponent } from './components/update/update.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

/**
 * @classdesc - ProductModule функциональный модуль
 * для работы с продуктами
 */
@NgModule({
  declarations: [HomeComponent, CreateComponent, UpdateComponent],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    ButtonModule,
    FileUploadModule,
    ConfirmDialogModule,
    ReactiveFormsModule,
    ProductRoutingModule
  ]
})
export default class ProductModule { }
