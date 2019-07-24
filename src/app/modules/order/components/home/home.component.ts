import { Component, OnInit } from '@angular/core';
import { Order } from '../../models/order';
import { RpcService } from '../../../../shared/services/rpc.service';

/**
 * @classdesc - HomeComponent корневой компонент функционального модуля
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  /**
   * @var progress: number -
   */
  private progress: number;

  /**
   * @var ordersList: [] - массив заказов клиентов
   */
  private ordersList: [];

  /**
   * @var cols: [] - массив с названиями полей и колонок
   * таблицы заказов(пользователей)
   */
  private cols = [
    { field: 'id',             header: 'id',             class: 'th-btn' },
    { field: 'account_number', header: 'account_number', class: '' },
    { field: 'address',        header: 'address',        class: '' },
    { field: 'type',           header: 'type',           class: '' }
  ];

  /**
   * constructor - конструктор
   * @param rpcService - сервис для обращения к серверу апи
   */
  constructor( private rpcService: RpcService<Order> ) {}

  /**
   * ngOnInit
   */
  ngOnInit() {
    this.rpcService.makeRequest( 'get', 'orders/list' ).subscribe(( response ) => {
      if ( response !== undefined ) {
        if ( response.hasOwnProperty('message') ) {
          this.progress = response.message;
        } else {
          if ( response.type !== 0 && !response.hasOwnProperty('ok') ) {
            this.ordersList = response;
          }
        }
      }
    });
  }
}
