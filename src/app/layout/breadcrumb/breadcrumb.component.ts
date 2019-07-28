'use strict';
import { Component, OnInit } from '@angular/core';
import { Router, ChildActivationEnd } from '@angular/router';
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
  private _itemsBreadCrumb: MenuItem[] = [{ label: 'Home', routerLink: '/', icon: 'pi pi-home' }];

  /**
   * constructor - конструктор
   * @param _router - текущий маршрут
   */
  constructor( private _router: Router ) {}

  /**
   * ngOnInit
   */
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
      .pipe( filter(event => event instanceof ChildActivationEnd ) )
      .subscribe(( event: any ) => {
        this.init( event );
    });
  }

  /**
   * init - инициализирует дефалтный набор хлебных крошек
   * @param event - событие изменения маршрута
   * @return void
   */
  private init( event: any = '' ) {

    if ( event['snapshot'] !== undefined ) {
      if ( Object.keys(event['snapshot'].data).length > 0 ) {
        this._itemsBreadCrumb = [{ label: 'Home', routerLink: '/', icon: 'pi pi-home' }];

        const breadCrumbName = event['snapshot'].data.breadCrumbName;
        const routePath      = event['snapshot'].routeConfig.path;
        this._itemsBreadCrumb.push({ label: breadCrumbName, routerLink: routePath, icon: '' });

        const breadCrumbChildName = event['snapshot'].children[0].data.breadCrumbName;
        if ( breadCrumbName !== breadCrumbChildName) {
          this._itemsBreadCrumb.push({ label: breadCrumbChildName, routerLink: '', icon: '' });
        }
      }
    }
  }

  /**
   * itemsBreadCrumb
   */
  get itemsBreadCrumb(): MenuItem[] {
    return this._itemsBreadCrumb;
  }
}
