import { Component, OnInit } from '@angular/core';
import { Invoice } from '../../models/invoice';
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
   * @var invoicesList: [] - массив счет фактур
   */
  private invoicesList: [];

  /**
   * @var cols: [] - массив с названиями полей и колонок
   * таблицы кредитных карт(пользователей)
   */
  private cols = [
    { field: 'id',             header: 'id',             class: 'th-btn' },
    { field: 'address',        header: 'address',        class: '' },
    { field: 'invoice_status', header: 'invoice_status', class: '' }
  ];

  /**
   * constructor - конструктор
   * @param rpcService - сервис для обращения к серверу апи
   */
  constructor( private rpcService: RpcService<Invoice> ) {}

  /**
   * ngOnInit
   */
  ngOnInit() {}

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.rpcService.makeRequest( 'get', 'invoices/list' ).subscribe(( response ) => {
      if ( response !== undefined ) {
        if ( response.hasOwnProperty('message') ) {
          this.progress = response.message;
        } else {
          if ( response.type !== 0 && !response.hasOwnProperty('ok') ) {
            this.invoicesList = response;
          }
        }
      }
    });
  }
}
