import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

/**
 * @classdesc - LeftMenuComponent компонент для отображения левого меню
 */
@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit {

  /**
   * @var MenuItem[]
   */
  private _items: MenuItem[];

  /**
   * constructor
   */
  constructor() {}

  ngOnInit() {
    this._items = [
      { label: 'Пользователи', icon: 'pi pi-pw pi-user', items:
          [
            { label: 'Список пользователей', icon: 'pi pi-pw pi-users', routerLink: '/customers' },
            { label: 'Добавить пользователя', icon: 'pi pi-pw pi-user-plus', routerLink: '/customers/create' },
          ]
      },
      { label: 'Адреса', icon: 'pi pi-pw pi-list', items:
        [
          { label: 'Список адресов', icon: 'pi pi-pw pi-list', routerLink: '/addresses' },
        ]
      },
      { label: 'Кредитные карты', icon: 'pi pi-pw pi-user-plus', items:
          [
            { label: 'Список кредитных карт', icon: 'pi pi-pw pi-list', routerLink: '/credit-cards' },
          ]
      },
      { label: 'Заказы', icon: 'pi pi-pw pi-dollar', items:
          [
            { label: 'Список заказов', icon: 'pi pi-pw pi-list', routerLink: '/orders' },
          ]
      },
      { label: 'Счет фактуры', icon: 'pi pi-pw pi-eject', items:
          [
            { label: 'Список счет фактур', icon: 'pi pi-pw pi-list', routerLink: '/invoices' },
          ]
      },
      { label: 'Доставка', icon: 'pi pi-pw pi-camera', items:
          [
            { label: 'Список доставок ', icon: 'pi pi-pw pi-list', routerLink: '/shipments' },
          ]
      },
      { label: 'Каталог', icon: 'pi pi-pw pi-bars', items:
        [
          { label: 'Список категорий', icon: 'pi pi-pw pi-list', routerLink: '/categories' },
          { label: 'Добавить категорию', icon: 'pi pi-pw pi-plus-circle', routerLink: '/categories/create' },
          { label: 'Список продуктов', icon: 'pi pi-pw pi-list', routerLink: '/products' }
        ]
      },
      { label: 'Дерево категорий', icon: 'pi pi-pw pi-bars', items:
          [
            { label: 'Дерево', icon: 'pi pi-pw pi-list', routerLink: '/categories-tree' }
          ]
      }
    ];
  }

  /**
   * MenuItem
   */
  get items(): MenuItem[] {
    return this._items;
  }
}
