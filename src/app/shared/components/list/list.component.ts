'use strict';
import { Component, Input, OnInit } from '@angular/core';
import { RpcService } from '../../../modules/customer/services/rpc.service';

/**
 * @classdesc - ListComponent компонент отрисовки записей сущности в виде даблицы
 */
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [RpcService]
})
export class ListComponent implements OnInit {

  /**
   * @var cols: [] - массив с названиями полей и колонок
   */
  @Input()
  public cols: [];

  /**
   * @var entityList: [] - массив записей сущности
   */
  @Input()
  private entityList: [];

  /**
   * constructor - конструктор
   * @param rpcService - сервис для обращения к серверу апи
   */
  constructor( private rpcService: RpcService ) { }

  /**
   * ngOnInit
   */
  ngOnInit() {}
}
