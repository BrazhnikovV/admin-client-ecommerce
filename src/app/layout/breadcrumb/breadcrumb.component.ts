'use strict';
import { Component, OnInit } from '@angular/core';
import { Router, Routes, NavigationEnd } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { filter } from 'rxjs/operators';

/**
 * @classdesc - BreadcrumbComponent компонент для отображения хлебных крошек
 */
@Component({
  selector:    'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls:   ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  /**
   * @var MenuItem[] itemsBreadCrumb
   */
  private _itemsBreadCrumb: MenuItem[] = [];

  /**
   * @var Routes config
   */
  private config: Routes;

  /**
   * constructor
   */
  constructor( private _router: Router ) {
    this.config = _router.config;
  }

  ngOnInit() {
    this.listenRouting();
    this.init();
  }

  /**
   * listenRouting - подписываемся на события роутинга,
   * конкретно на NavigationEnd(окончание навигации)
   * @return void
   */
  private listenRouting() {
    this._router.events
      .pipe( filter(event => event instanceof NavigationEnd ) )
      .subscribe(( router: any ) => {
        this.init( router.url );
    });
  }

  /**
   * init - инициализирует дефалтный набор хлебных крошек
   * @return void
   */
  private init( url: String = '' ) {

    this._itemsBreadCrumb = [{ label: 'Home', routerLink: '/', icon: 'pi pi-home' }];

    this.config.map( item => {

      let breadCrumbName;
      if ( item.hasOwnProperty( 'data' ) ) {
        breadCrumbName = item.data.breadCrumbName;
      }

      if ( url === '/' + item.path ) {
        this._itemsBreadCrumb.push({ label: breadCrumbName/*, routerLink: item.path*/ });
      }
    });
  }

  /**
   * itemsBreadCrumb
   */
  get itemsBreadCrumb(): MenuItem[] {
    return this._itemsBreadCrumb;
  }
}
