'use strict';
import { Component, OnInit } from '@angular/core';
import {Category} from '../../models/category';
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
   * @var categoryList: [] - массив категорий
   */
  private categoryList: [];


  /**
   * @var progress: String - массив клиентов
   */
  private progress: String;

  /**
   * @var cols: [] - массив с названиями полей и колонок
   * таблицы клиентов(пользователей)
   */
  private cols = [
    { field: 'id',          header: 'id',          class: 'th-btn' },
    { field: 'name',        header: 'name',        class: '' },
    { field: 'description', header: 'description', class: '' }
  ];

  /**
   * constructor - конструктор
   * @param rpcService - сервис для обращения к серверу апи
   */
  constructor( private rpcService: RpcService<Category> ) {}

  /**
   * ngOnInit
   */
  ngOnInit() {
    this.rpcService.makeRequest( 'get', 'categories/list' ).subscribe(( response ) => {
      if ( response !== undefined ) {
        if ( response.hasOwnProperty('status') ) {
          this.progress = response.message;
        } else {
          if ( response.type !== 0 && !response.hasOwnProperty('ok') ) {
            this.categoryList = response;
          }
        }
      }
    });
  }
}
