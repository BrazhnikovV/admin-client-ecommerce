'use strict';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

/**
 * @classdesc - ModalDialogComponent компонент для вывода сообщений пользователю
 */
@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.css']
})
export class ModalDialogComponent implements OnInit {

  /**
   * @var childEvent: EventEmitter<string>
   */
  @Output()
  private childEvent = new EventEmitter<string>();

  /**
   *  @var display: boolean -
   */
  @Input()
  private display: boolean;

  /**
   *  @var isDelete: boolean -
   */
  @Input()
  private isDelete: boolean;

  /**
   * constructor - конструктор
   */
  constructor() {}

  /**
   * ngOnInit
   */
  ngOnInit() {}

  /**
   * onHide - слушать событие закрытия окна
   */
  private onHide() {
    this.childEvent.emit( 'onHide' );
  }

  onYesDelete() {
    this.childEvent.emit( 'onDeleteNode' );
  }
}
