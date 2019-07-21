import { Component, OnInit } from '@angular/core';
import {Product} from '../../models/product';
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
   * @var productsList: [] - массив продуктов
   */
  private productsList: [];

  /**
   * @var cols: [] - массив с названиями полей и колонок
   * таблицы кредитных карт(пользователей)
   */
  private cols = [
    { field: 'id',             header: 'id',             class: 'th-btn' },
    { field: 'name',           header: 'name',           class: '' },
    { field: 'price',          header: 'price',          class: '' },
    { field: 'description',    header: 'description',    class: '' },
    { field: 'product_number', header: 'product_number', class: '' }
  ];

  /**
   * constructor - конструктор
   * @param rpcService - сервис для обращения к серверу апи
   */
  constructor( private rpcService: RpcService<Product> ) {}

  /**
   * ngOnInit
   */
  ngOnInit() {
    this.rpcService.makeRequest( 'get', 'products/list' ).subscribe(( response ) => {
      this.productsList = response;
    });
  }
}
