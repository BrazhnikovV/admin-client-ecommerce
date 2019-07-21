'use strict';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Messages } from 'primeng/primeng';
import { HeandlerMessage } from '../../../utils/HeandlerMessage';

/**
 * @classdesc - ValidatorMessageComponent компонент для отображения сообщений валидатора
 */
@Component({
  selector: 'app-validator-message',
  templateUrl: './validator-message.component.html',
  styleUrls: ['./validator-message.component.css']
})
export class ValidatorMessageComponent implements OnInit {

  /**
   *  @var field: FormControl - делегат от родительского компонента
   *  для контроля валидации полей
   */
  @Input()
  private field: FormControl;

  /**
   *  @var msgs: Messages[] - массив сообщений праймфэйсес(primefaces)
   */
  private msgs: Messages[] = [];

  /**
   * constructor
   */
  constructor() {}

  /**
   * ngOnInit
   */
  ngOnInit() {}

  /**
   * ngOnChanges - перехватываем событие изменения компонента
   * @return void | boolean
   */
  public ngOnChanges() {
    const field = this.field;

    if ( !field || !field.errors ) {
      return false;
    }

    this.msgs = [];
    const errors = HeandlerMessage.handle( field );

    errors.forEach(el => this.msgs.push(el) );
  }
}
