'use strict';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { RpcService } from '../../../../shared/services/rpc.service';
import { CategoryTree } from '../../models/category-tree';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorMessageComponent } from '../../../../shared/components/validator-message/validator-message.component';
import { isNull, isUndefined } from 'util';
import { ModalFormComponent } from '../modal-form/modal-form.component';
import { isArray } from 'rxjs/internal-compatibility';

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
   * @var viewChildrenFormDialog: QueryList<viewChildrenFormDialog> -
   */
  @ViewChildren( ModalFormComponent )
  private viewChildrenFormDialog: QueryList<ModalFormComponent>;

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
    parentId: new FormControl('', [
      Validators.required,
      Validators.minLength(0 )
    ]),
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
    const formControls = this.categoryTreeForm.controls;
    Object.keys($event.node).filter( filterKey => formControls.hasOwnProperty( filterKey ) ).map( ( key) => {
      formControls[key].setValue( $event.node[key] );
    });
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

  }

  /**
   * onCreateBranch - слушает событие клика по кнопке - добавить ветку
   */
  private onCreateBranch() {
    if ( isUndefined( this.selectedNode ) || isNull( this.selectedNode ) ) {
      this.displayDialog = true;
    } else {
      this.display = true;
    }
  }

  /**
   * onCreateNode - слушает событие клика по кнопке - добавить узел
   */
  private onCreateNode() {
    // this.categoryTreeForm.reset();
    this.display = true;
    // console.log(this.categoryTree);
  }

  /**
   * onChildEvent - слушать событие потомка
   * @param $event - событие потомка
   * @return void
   */
  private onChildEvent( $event: string ) {
    if ( $event === 'onCreate' ) {
      if ( isUndefined( this.selectedNode ) || isNull( this.selectedNode ) ) {

        const parentId = this.categoryTree.filter( (catTree, index) => index === 0 )[0]['parentId'];
        this.updateCategoryTree( parentId );

      } else {
        console.log(this.selectedNode);
      }
    }
    this.displayDialog = false;
    this.display = false;
  }

  /**
   * updateCategoryTree
   * @param parentId -
   * @return void
   */
  private updateCategoryTree( parentId: number ) {

    const modalCategoryTreeForm = this.viewChildrenFormDialog.first.modalCategoryTreeForm;
    modalCategoryTreeForm.get('parentId').setValue( parentId );
    this.rpcService.makePost( 'categories-tree/create', modalCategoryTreeForm.value  ).subscribe(
      response => {
        setTimeout( m => {
          if ( isArray(response) ) {
            this.categoryTree = response;
          }
          this.router.navigate(['/categories-tree'] );
        }, 300 );
      }, error => {
        console.log(error);
        this.errors = error;
      }
    );
  }
}
