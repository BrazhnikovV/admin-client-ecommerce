'use strict';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ValidatorMessageComponent } from '../../../../shared/components/validator-message/validator-message.component';
import { RpcService } from '../../../../shared/services/rpc.service';
import { Product } from '../../../product/models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { throwError } from 'rxjs';

/**
 * @classdesc - UpdateComponent компонент страницы обновления категории
 */
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
  providers: [ConfirmationService]
})
export class UpdateComponent implements OnInit {

  /**
   * @var id: number - идентификатор
   */
  private id: number;

  /**
   * @var colsProducts: [] - массив с названиями полей и колонок
   * таблицы продуктов
   */
  private colsProducts = [
    { field: 'id',             header: 'id',            class: 'th-btn' },
    { field: 'name',           header: 'name',          class: '' },
    { field: 'description',    header: 'description',   class: '' },
    { field: 'price',          header: 'price',         class: '' },
    { field: 'productNumber',  header: 'productNumber', class: '' }
  ];

  /**
   * @var viewChildren: QueryList<ValidatorMessageComponent> - список компонентов
   * для отображения сообщений валидатора
   */
  @ViewChildren( ValidatorMessageComponent )
  private viewChildren: QueryList<ValidatorMessageComponent>;

  /**
   *  @var errors: [] - массив ошибок
   */
  private errors: [] = [];

  /**
   *  @var  products: Product[] - массив продуктов
   */
  private products: Product[] = [];

  /**
   *  @var display: boolean -
   */
  private display: boolean;

  /**
   * constructor
   * @param rpcService - сервис
   * @param activatedRoute -
   * @param router -
   * @param confirmationService -
   */
  constructor( private rpcService: RpcService<Product>,
               private activatedRoute: ActivatedRoute,
               private router: Router,
               private confirmationService: ConfirmationService ) {

    this.id = activatedRoute.snapshot.params['id'];
  }

  /**
   *  @var categoryForm: FormGroup - группа валидируемых полей
   */
  private categoryForm: FormGroup = new FormGroup({
    id: new FormControl('', [
      Validators.required
    ]),
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(4 ),
      Validators.maxLength(32 )
    ]),
    description: new FormControl('' , [
      Validators.required,
      Validators.minLength(4 ),
      Validators.maxLength(1024 )
    ])
  });

  /**
   * onSubmit - перехватываем события откравки формы
   * @return void
   */
  onSubmit() {
    this.rpcService.makePut( 'categories/update', this.categoryForm.value ).subscribe(
      response => {
        setTimeout( m => {
          this.router.navigate(['/categories'] );
        }, 500 );
      }, error => {
        console.log(error);
        this.errors = error;
      }
    );
  }

  /**
   * inputChange - перехватываем событие набора символов в текстовых полях
   * @return void
   */
  inputChange() {
    this.viewChildren.forEach( child => child.ngOnChanges() );
  }

  /**
   * ngOnInit
   */
  ngOnInit() {
    if ( this.id > 0 ) {
      const controls = this.categoryForm.controls;
      this.rpcService.makeRequest('get', 'categories/' + this.id ).subscribe(( categories ) => {
        Object.keys( categories ).filter( key => controls.hasOwnProperty( key ) ).map( ( key ) => {
          this.categoryForm.get( key ).setValue( categories[key] );
        });
      });

      this.rpcService.makeRequest('get', 'products/list-by-category-id/' + this.id ).subscribe(( products ) => {
        Object.keys( products ).filter( key =>  parseInt( key, 10 ) >= 0 ).map( ( key ) => {
          this.products.push( products[key] );
        });
      });
    } else {
      return throwError('Error: id less than zero.');
    }
  }

  /**
   * onAction - слушаем событие удаления продукта
   * @param $event - объект события
   */
  private onAction( $event ) {
    this.confirm( $event.id );
    $event.preventDefault();
  }

  /**
   * confirm
   * @param id - идентификатор продукта
   * @return void
   */
  private confirm( id: number ) {
    this.confirmationService.confirm({
      message: 'Вы уверены, что хотите удалить эту запись?',
      accept: () => {
        this.display = true;
        this.rpcService.makeRequest('delete', 'products/delete/' + id ).subscribe(( response ) => {
          this.products = this.products.filter( r => r.id !== id );
        });
      }
    });
  }
}
