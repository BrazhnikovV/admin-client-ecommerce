import { Component, OnInit } from '@angular/core';
import { RpcService } from '../../../../shared/services/rpc.service';
import { Creditcard } from '../../models/creditcard';

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
   * @var custmersList: [] - массив клиентов
   */
  private creditCardsList: [];

  /**
   * @var cols: [] - массив с названиями полей и колонок
   * таблицы кредитных карт(пользователей)
   */
  private cols = [
    { field: 'id',     header: 'id',     class: 'th-btn' },
    { field: 'number', header: 'number', class: '' },
    { field: 'type',   header: 'type',   class: '' }
  ];

  /**
   * constructor - конструктор
   * @param rpcService - сервис для обращения к серверу апи
   */
  constructor( private rpcService: RpcService<Creditcard> ) {}

  /**
   * ngOnInit
   */
  ngOnInit() {}

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.rpcService.makeRequest( 'get', 'cards/list' ).subscribe(( response ) => {
      if ( response !== undefined ) {
        if ( response.hasOwnProperty('message') ) {
          this.progress = response.message;
        } else {
          if ( response.type !== 0 && !response.hasOwnProperty('ok') ) {
            this.creditCardsList = response;
          }
        }
      }
    });
  }
}
