'use strict';
import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorMessageComponent } from '../../../../shared/components/validator-message/validator-message.component';
import { RpcService } from '../../../../shared/services/rpc.service';
import { CategoryTree } from '../../models/category-tree';
import { Router } from '@angular/router';

/**
 * @classdesc - ModalFormComponent  компонент
 */
@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.css']
})
export class ModalFormComponent implements OnInit {

  /**
   * @var childEvent: EventEmitter<string>
   */
  @Output()
  private childEvent = new EventEmitter<string>();

  /**
   * @var display: boolean
   */
  @Input()
  private display = false;

  /**
   *  @var errors: [] - массив ошибок
   */
  private errors: [];

  /**
   * @var viewChildren: QueryList<ValidatorMessageComponent> - список компонентов
   * для отображения сообщений валидатора
   */
  @ViewChildren( ValidatorMessageComponent )
  private viewChildren: QueryList<ValidatorMessageComponent>;

  /**
   * constructor - конструктор
   * @param rpcService - сервис
   * @param router - маршрутизатор
   */
  constructor( private rpcService: RpcService<CategoryTree[]>, private router: Router ) {}

  /**
   *  @var categoryTreeForm: FormGroup - группа валидируемых полей
   */
  private categoryTreeForm: FormGroup = new FormGroup({
    label: new FormControl('', [
      Validators.required,
      Validators.minLength(4 ),
      Validators.maxLength(32 )
    ]),
    data: new FormControl('' , [
      Validators.required,
      Validators.minLength(4 ),
      Validators.maxLength(1024 )
    ])
  });

  /**
   * ngOnInit
   */
  ngOnInit() {}

  /**
   * inputChange - перехватываем событие набора символов в текстовых полях
   * @return void
   */
  private inputChange() {
    this.viewChildren.forEach( child => child.ngOnChanges() );
  }

  /**
   * onSubmit -
   */
  private onSubmit() {
    this.rpcService.makePost( 'categories-tree/create', this.categoryTreeForm.value ).subscribe(
      response => {
        setTimeout( m => {
          this.router.navigate(['/categories-tree'] );
        }, 500 );
      }, error => {
        console.log(error);
        this.errors = error;
      }
    );
  }

  /**
   * onHide - слушать событие закрытия окна
   */
  private onHide() {
    this.childEvent.emit( 'onHide' );
  }
}