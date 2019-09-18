'use strict';
import {Component, Input, OnInit} from '@angular/core';

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
   *  @var display: boolean -
   */
  @Input()
  private display = false;

  /**
   * constructor - конструктор
   */
  constructor() {}

  /**
   * ngOnInit
   */
  ngOnInit() {}
}
