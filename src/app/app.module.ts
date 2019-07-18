'use strict';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RoutingModule } from './router/routing.module';
import { AppComponent } from './layout/app.component';
import { LeftMenuComponent } from './layout/left-menu/left-menu.component';
import { BreadcrumbComponent } from './layout/breadcrumb/breadcrumb.component';
import { PanelMenuModule } from 'primeng/panelmenu';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent, LeftMenuComponent, BreadcrumbComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    PanelMenuModule,
    BreadcrumbModule,
    BrowserAnimationsModule
  ],
  providers: [],
  /*   /src/app/layout   */
  bootstrap: [AppComponent]
})
export class AppModule { }
