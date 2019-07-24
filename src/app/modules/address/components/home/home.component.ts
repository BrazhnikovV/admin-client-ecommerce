'use strict';
import { Component, OnInit } from '@angular/core';
import { Address } from '../../models/address';
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
   * @var custmersList: [] - массив клиентов
   */
  private addressesList: [];

  /**
   * @var cols: [] - массив с названиями полей и колонок
   * таблицы адресов(пользователей)
   */
  private cols = [
    { field: 'id',       header: 'id',       class: 'th-btn' },
    { field: 'city',     header: 'city',     class: '' },
    { field: 'country',  header: 'country',  class: '' },
    { field: 'district', header: 'district', class: '' },
    { field: 'street1',  header: 'street1',  class: '' },
    { field: 'street2',  header: 'street2',  class: '' },
    { field: 'zipCode',  header: 'zipCode',  class: '' }
  ];

  /**
   * constructor - конструктор
   * @param rpcService - сервис для обращения к серверу апи
   */
  constructor( private rpcService: RpcService<Address> ) {}

  ngOnInit() {
    this.rpcService.makeRequest( 'get', 'address/list' ).subscribe(( response ) => {
      if ( response !== undefined ) {
        if ( response.hasOwnProperty('message') ) {
          this.progress = response.message;
        } else {
          if ( response.type !== 0 && !response.hasOwnProperty('ok') ) {
            this.addressesList = response;
          }
        }
      }
    });
  }
}
