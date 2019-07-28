'use strict';
import { Component, Input, OnInit } from '@angular/core';

/**
 * @classdesc - ListComponent компонент отрисовки записей сущности в виде даблицы
 */
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: []
})
export class ListComponent implements OnInit {

  /**
   * @var cols: [] - массив с названиями полей и колонок
   */
  @Input()
  public cols: [];

  /**
   * @var deleteAction: boolean -
   */
  @Input()
  public deleteAction = false;

  /**
   * @var entityList: [] - массив записей сущности
   */
  @Input()
  private entityList: [];

  /**
   * constructor - конструктор
   */
  constructor() {}

  /**
   * ngOnInit
   */
  ngOnInit() {}
}
