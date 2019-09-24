'use strict';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { RpcService } from '../../../../shared/services/rpc.service';
import { CategoryTree } from '../../models/category-tree';
import { Router } from '@angular/router';
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
   * @var viewChildrenFormDialog: QueryList<viewChildrenFormDialog> -
   */
  @ViewChildren( ModalFormComponent )
  private viewChildrenFormDialog: QueryList<ModalFormComponent>;

  /**
   * @var isUpdate: boolean -
   */
  private isUpdate: boolean;

  /**
   * @var isDisabledDelete: boolean -
   */
  private isDisabledDelete: boolean;

  /**
   * @var loadingTree: boolean -
   */
  private loadingTree = true;

  /**
   * constructor - конструктор
   * @param rpcService - сервис
   * @param router - маршрутизатор
   */
  constructor( private rpcService: RpcService<CategoryTree>, private router: Router ) {}

  /**
   * ngOnInit
   */
  ngOnInit() {
    this.removeOrListCategoryTree( 'get', 'categories-tree/list' );
  }

  /**
   * nodeSelect - слушать события клика по узлу дерева
   * @param $event - событие
   * @return void
   */
  private nodeSelect( $event: any ) {
    this.titleNode = $event.node.label;
    this.dataNode = $event.node.data;
    $event.node.children.length === 0 ? this.isDisabledDelete = true : this.isDisabledDelete = false;
  }

  /**
   * onUpdateNode - слушает событие клика по кнопке - обновить узел
   */
  private onUpdateNode() {

    if ( isUndefined( this.selectedNode ) || isNull( this.selectedNode ) ) {
      this.displayDialog = true;
    } else {
      this.fillFieldsDialogForm();
      this.display = true;
    }
    this.isUpdate = true;
  }

  /**
   * onCreateNode - слушает событие клика по кнопке - добавить узел
   */
  private onCreateNode() {
    this.viewChildrenFormDialog.first.modalCategoryTreeForm.reset();
    this.display = true;
    this.isUpdate = false;
  }

  /**
   * onChildEvent - слушать событие потомка
   * @param $event - событие потомка
   * @return void
   */
  private onChildEvent( $event: string ) {
    if ( $event === 'onUpdateNode' ) {
      if ( !isUndefined( this.selectedNode ) || !isNull( this.selectedNode ) ) {
        this.updateCategoryTree();
      }
    } else if ( $event === 'onCreateNode' ) {
      if ( isUndefined( this.selectedNode ) || isNull( this.selectedNode ) ) {
        const parentId = this.categoryTree.filter( (catTree, index) => index === 0 )[0]['parentId'];
        this.createCategoryTree( parentId );
      } else {
        this.createCategoryTree( this.selectedNode.id );
      }
    } else if ( $event === 'onDeleteNode' ) {
      this.viewChildrenFormDialog.first.modalCategoryTreeForm.reset();
      this.removeOrListCategoryTree( 'delete', 'categories-tree/delete/' + this.selectedNode.id );
    } else {
      console.log('close');
    }
    this.displayDialog = false;
    this.display = false;
  }

  /**
   * createCategoryTree
   * @param parentId -
   * @return void
   */
  private createCategoryTree( parentId: number ) {

    const modalCategoryTreeForm = this.viewChildrenFormDialog.first.modalCategoryTreeForm;
    modalCategoryTreeForm.get('parentId').setValue( parentId );
    this.rpcService.makePost( 'categories-tree/create', modalCategoryTreeForm.value  ).subscribe(
      response => {
        this.handlerSuccessResponse( response );
        this.resetDataNode();
      }, error => {
        this.handlerErrorResponse( error );
      }
    );
  }

  /**
   * updateCategoryTree
   * @return void
   */
  private updateCategoryTree() {

    const modalCategoryTreeForm = this.viewChildrenFormDialog.first.modalCategoryTreeForm;
    this.selectedNode.label = modalCategoryTreeForm.get('label').value;
    this.selectedNode.data = modalCategoryTreeForm.get('data').value;

    delete this.selectedNode['parent'];
    delete this.selectedNode['children'];

    this.rpcService.makePut( 'categories-tree/update', this.selectedNode  ).subscribe(
      response => {
        this.handlerSuccessResponse( response );
      }, error => {
        this.handlerErrorResponse( error );
      }
    );
  }

  /**
   * fillFieldsDialogForm -
   * @return void
   */
  private fillFieldsDialogForm() {
    const formDialogControls = this.viewChildrenFormDialog.first.modalCategoryTreeForm.controls;
    Object.keys(this.selectedNode).filter( filterKey => formDialogControls.hasOwnProperty( filterKey ) ).map( ( key) => {
      formDialogControls[key].setValue( this.selectedNode[key] );
    });
  }

  /**
   * removeCategoryTree
   * @return void
   */
  private removeOrListCategoryTree(  method: string, path: string) {
    this.rpcService.makeRequest( method, path ).subscribe(( response ) => {
      if ( response !== undefined ) {
        if ( response.hasOwnProperty('status') ) {
          this.progress = response.message;
        } else {
          if ( response.type !== 0 && !response.hasOwnProperty('ok') ) {
            this.loadingTree = false;
            this.categoryTree = response;
          }
        }
        this.resetDataNode();
      }
    }, error => {
      this.handlerErrorResponse( error );
    });
  }

  /**
   * onRemoveNode
   * @return void
   */
  private onRemoveNode() {
      this.displayDialog = true;
  }

  expandAll() {
    this.categoryTree.forEach( node => {
      this.expandRecursive(node, true);
    } );
  }

  collapseAll() {
    this.categoryTree.forEach( node => {
      this.expandRecursive( node, false );
    });
  }

  private expandRecursive( node: CategoryTree, isExpand: boolean ) {
    node.expanded = isExpand;
    if (node.children) {
      node.children.forEach( childNode => {
        this.expandRecursive(childNode, isExpand);
      });
    }
  }

  /**
   * handlerSuccessResponse -
   * @param response -
   * @return void
   */
  private handlerSuccessResponse( response ) {
    setTimeout( m => {
      if ( isArray(response) ) {
        this.categoryTree = response;
      }
      this.router.navigate(['/categories-tree'] );
    }, 300 );
  }

  /**
   * handlerErrorResponse -
   * @param error -
   * @return void
   */
  private handlerErrorResponse( error ) {
    console.log(error);
    this.errors = error;
  }

  /**
   * resetDataNode -
   * @return void
   */
  private resetDataNode() {
    this.selectedNode = null;
    this.titleNode = '-';
    this.dataNode = 'Не выбрано.';
  }
}
