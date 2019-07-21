'use strict';
import { Component, OnInit } from '@angular/core';
import {Shipment} from '../../models/shipment';
import {RpcService} from '../../../../shared/services/rpc.service';

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
   * @var shipmentsList: [] - массив доставок
   */
  private shipmentsList: [];

  /**
   * @var cols: [] - массив с названиями полей и колонок
   * таблицы доставок(пользователей)
   */
  private cols = [
    { field: 'id',              header: 'id',              class: 'th-btn' },
    { field: 'address',         header: 'address',         class: '' },
    { field: 'shipment_status', header: 'shipment_status', class: '' }
  ];

  /**
   * constructor - конструктор
   * @param rpcService - сервис для обращения к серверу апи
   */
  constructor( private rpcService: RpcService<Shipment> ) {}

  /**
   * ngOnInit
   */
  ngOnInit() {
    this.rpcService.makeRequest( 'get', 'invoices/list' ).subscribe(( response ) => {
      this.shipmentsList = response;
    });
  }
}
