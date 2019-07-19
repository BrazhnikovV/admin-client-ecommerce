'use strict';
import { NgModule } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { AppComponent } from './layout/app.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { HttpClientModule } from '@angular/common/http';
import { RoutingModule } from './router/routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { LeftMenuComponent } from './layout/left-menu/left-menu.component';
import { BreadcrumbComponent } from './layout/breadcrumb/breadcrumb.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/**
 * @classdesc - AppModule корневой модуль приложения
 */
@NgModule({
  declarations: [
    AppComponent, LeftMenuComponent, BreadcrumbComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    PanelMenuModule,
    HttpClientModule,
    BreadcrumbModule,
    BrowserAnimationsModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent] /* ==> src/app/layout */
})
export class AppModule { }
