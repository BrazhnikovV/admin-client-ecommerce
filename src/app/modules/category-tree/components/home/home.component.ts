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
   *  @var titleNode: string -
   */
  private titleNode = '-';

  /**
   *  @var dataNode: string -
   */
  private dataNode = 'Не выбрано.';

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
   * @var isUpdate: boolean -
   */
  private isUpdate: boolean;

  /**
   * constructor - конструктор
   * @param rpcService - сервис
   * @param router - маршрутизатор
   */
  constructor( private rpcService: RpcService<CategoryTree[]>, private router: Router ) {}

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
    this.titleNode = $event.node.label;
    this.dataNode = $event.node.data;
  }

  /**
   * inputChange - перехватываем событие набора символов в текстовых полях
   * @return void
   */
  private inputChange() {
    this.viewChildren.forEach( child => child.ngOnChanges() );
  }

  /**
   * onUpdateNode - слушает событие клика по кнопке - обновить узел
   */
  private onUpdateNode() {
    console.log('onUpdateNode ==>');
    if ( isUndefined( this.selectedNode ) || isNull( this.selectedNode ) ) {
      this.displayDialog = true;
    } else {
      this.display = true;
    }
    this.isUpdate = false;
  }

  /**
   * onCreateNode - слушает событие клика по кнопке - добавить узел
   */
  private onCreateNode() {
    console.log('onCreateNode ==>');
    if ( !isUndefined( this.selectedNode ) && !isNull( this.selectedNode ) ) {
      const formDialogControls = this.viewChildrenFormDialog.first.modalCategoryTreeForm.controls;
      Object.keys(this.selectedNode).filter( filterKey => formDialogControls.hasOwnProperty( filterKey ) ).map( ( key) => {
        formDialogControls[key].setValue( this.selectedNode[key] );
      });
    } else {
      // console.log(this.categoryTree);
    }

    this.display = true;
    this.isUpdate = true;
  }

  /**
   * onChildEvent - слушать событие потомка
   * @param $event - событие потомка
   * @return void
   */
  private onChildEvent( $event: string ) {
    if ( $event === 'onUpdateNode' ) {
      if ( isUndefined( this.selectedNode ) || isNull( this.selectedNode ) ) {
        const parentId = this.categoryTree.filter( (catTree, index) => index === 0 )[0]['parentId'];
        this.updateCategoryTree( parentId );

      } else {
        console.log(this.selectedNode);
      }
    } else if ( $event === 'onCreateNode' ) {
      console.log('onCreateNode');
    } else {
      console.log('else');
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
