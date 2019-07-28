'use strict';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

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
   * @var childEvent: EventEmitter<string>
   */
  @Output()
  private childEvent = new EventEmitter<string>();

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

  /**
   * onAction - подписаться на событие клика по кнопке удалить
   * @param $event - объект события
   * @param id - идентификатор изображения
   */
  onAction( $event , id: number ) {
    $event.id = id;
    this.childEvent.emit( $event );
  }
}
