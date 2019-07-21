'use strict';
import { Component, OnInit } from '@angular/core';
import { RpcService } from '../../../../shared/services/rpc.service';
import {Customer} from '../../models/customer';

/**
 * @classdesc - HomeComponent корневой компонент функционального модуля
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [RpcService]
})
export class HomeComponent implements OnInit {

  /**
   * @var custmersList: [] - массив клиентов
   */
  private custmersList: [];

  /**
   * @var cols: [] - массив с названиями полей и колонок
   * таблицы клиентов(пользователей)
   */
  private cols = [
    { field: 'id',        header: 'id',        class: 'th-btn' },
    { field: 'username',  header: 'username',  class: '' },
    { field: 'email',     header: 'email',     class: '' },
    { field: 'firstName', header: 'firstname', class: '' },
    { field: 'lastName',  header: 'lastname',  class: '' },
    { field: 'role',      header: 'role',      class: '' }
  ];

  /**
   * constructor - конструктор
   * @param rpcService - сервис для обращения к серверу апи
   */
  constructor( private rpcService: RpcService<Customer> ) {}

  /**
   * ngOnInit
   */
  ngOnInit() {
    this.rpcService.makeRequest( 'get', 'customers/list' ).subscribe(( response ) => {
      this.custmersList = response;
    });
  }
}
