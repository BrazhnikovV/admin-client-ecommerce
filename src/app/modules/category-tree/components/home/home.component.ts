'use strict';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { RpcService } from '../../../../shared/services/rpc.service';
import { CategoryTree } from '../../models/category-tree';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorMessageComponent } from '../../../../shared/components/validator-message/validator-message.component';
import {isNull, isUndefined} from 'util';

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
   * @var categoryTree: [] - дерево категорий
   */
  private categoryTree: CategoryTree[];

  /**
   * @var selectedNode: CategoryTree - выбранный пункт дерева категорий
   */
  private  selectedNode: CategoryTree;

  /**
   * @var progress: String - массив клиентов
   */
  private progress: String;

  /**
   *  @var errors: [] - массив ошибок
   */
  private errors: [];

  /**
   *  @var display: boolean -
   */
  private display: boolean;

  /**
   *  @var displayDialog: boolean -
   */
  private displayDialog: boolean;

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
  ngOnInit() {
    this.rpcService.makeRequest( 'get', 'categories-tree/list' ).subscribe(( response ) => {
      if ( response !== undefined ) {
        if ( response.hasOwnProperty('status') ) {
          this.progress = response.message;
        } else {
          if ( response.type !== 0 && !response.hasOwnProperty('ok') ) {
            this.categoryTree = response;
            console.log(this.categoryTree);
          }
        }
      }
    });
  }

  /**
   * nodeSelect - слушать события клика по узлу дерева
   * @param $event - событие
   * @return void
   */
  private nodeSelect( $event: any ) {
    console.log( $event );
    this.categoryTreeForm.get( 'label' ).setValue( $event.node.label );
    this.categoryTreeForm.get( 'data' ).setValue( $event.node.data );
  }

  /**
   * inputChange - перехватываем событие набора символов в текстовых полях
   * @return void
   */
  private inputChange() {
    this.viewChildren.forEach( child => child.ngOnChanges() );
  }

  /**
   * onSubmit - перехватываем события откравки формы
   * @return void
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
   * onCreateBranch - слушает событие клика по кнопке - добавить ветку
   */
  private onCreateBranch() {
    // this.categoryTreeForm.reset();
    console.log(this.selectedNode);
    if ( isUndefined( this.selectedNode ) || isNull( this.selectedNode ) ) {
      this.displayDialog = true;
    } else {
      this.display = true;
    }
  }

  /**
   * onChildEvent - слушать событие потомка
   * @param $event - событие потомка
   * @return void
   */
  private onChildEvent($event: string) {
    this.display = false;
  }
}
