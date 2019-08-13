'use strict';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ValidatorMessageComponent } from '../../../../shared/components/validator-message/validator-message.component';
import { RpcService } from '../../../../shared/services/rpc.service';
import { Product } from '../../models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Image } from '../../models/image';
import { ConfirmationService } from 'primeng/api';
import { throwError } from 'rxjs';
import { ProductStatus } from '../../enums/product-status.enum';

/**
 * @classdesc - UpdateComponent компонент страницы обновления продукта
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
   * @var colsImages: [] - массив с названиями полей и колонок
   * таблицы изображений продуктов
   */
  private colsImages = [
    { field: 'id',             header: 'id',             class: 'th-btn' },
    { field: 'name',           header: 'name',           class: '' },
    { field: 'size',           header: 'size',           class: '' },
    { field: 'description',    header: 'description',    class: '' }
  ];

  /**
   * @var viewChildren: QueryList<ValidatorMessageComponent> - список компонентов
   * для отображения сообщений валидатора
   */
  @ViewChildren( ValidatorMessageComponent )
  private viewChildren: QueryList<ValidatorMessageComponent>;

  /**
   *  @var formData: FormData - объект для передачи файлов post запросом
   */
  private formData: FormData = new FormData();

  /**
   *  @var errors: [] - массив ошибок
   */
  private errors: [];

  /**
   *  @var images: Image[] - массив изображений продуктов
   */
  private images: Image[];

  /**
   *  @var display: boolean -
   */
  private display: boolean;

  /**
   *  @var productStatus: ProductStatus -
   */
  private productStatus: ProductStatus;

  /**
   * constructor
   * @param rpcService -
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
   *  @var customerForm: FormGroup - группа валидируемых полей
   */
  private productForm: FormGroup = new FormGroup({
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
    ]),
    price: new FormControl('' , [
      Validators.required,
      Validators.max(100000 )
    ]),
    discount: new FormControl('' , [
      Validators.required,
      Validators.min(0 ),
      Validators.max(99 )
    ]),
    amount: new FormControl('' , [
      Validators.required,
      Validators.min(0 ),
      Validators.max(999 )
    ]),
    files: new FormControl('' , [
      Validators.required
    ]),
    images: new FormControl('', [
      Validators.required
    ]),
    productStatus: new FormControl('' , [
      Validators.required
    ]),
    productNumber: new FormControl('' , [
      Validators.required,
      Validators.minLength( 5 ),
      Validators.maxLength(5 )
    ])
  });

  /**
   * onSubmit - перехватываем события откравки формы
   * @return void
   */
  onSubmit() {
    this.setIntegerValueForProductStatus();
    this.formData.append('data', JSON.stringify( this.productForm.value ) );
    this.rpcService.makePutWithFiles( 'products/update/' + this.id, this.formData ).subscribe(
      response => {
        setTimeout( m => {
          this.router.navigate(['/products'] );
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
      const controls = this.productForm.controls;
      this.rpcService.makeRequest('get', 'products/' + this.id ).subscribe(( response ) => {
        Object.keys( response ).filter( key => controls.hasOwnProperty( key ) ).map( ( key ) => {
          this.productForm.get( key ).setValue( response[key] );
        });
        this.setBooleanValueForProductStatus();
        this.productForm.get( 'files' ).setValue( response.images );
        this.images = response.images;
      });
    } else {
      return throwError('Error: id less than zero.');
    }
    console.log(this.productForm);
  }

  /**
   * handleUploader - обработать событие выбора файлов для загрузки
   * @param event - событие выбора файлов
   */
  private handleUploader( event ) {

    const fileList: FileList = event.originalEvent.target.files;
    Object.keys( fileList ).map( file => {
      this.productForm.get('files').setValue( fileList[file] );
      this.formData.append('files', fileList[file] );
    });

    this.formData.append('data', JSON.stringify( this.productForm.value ) );
  }

  /**
   * onAction - слушаем событие клика по кнопке удалить изображение
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
        if ( this.images.length === 1 ) {
          this.display = true;
        } else {
          this.images = this.images.filter( r => r.id !== id );
          this.productForm.get( 'images' ).setValue( this.images );
        }
      }
    });
  }

  /**
   * setIntegerValueForProductStatus
   * @return void
   */
  private setIntegerValueForProductStatus() {
    if ( this.productForm.get( 'productStatus' ).value === true ) {
      this.productForm.get( 'productStatus' ).setValue( 1 );
    } else {
      this.productForm.get( 'productStatus' ).setValue( 0 );
    }
  }

  /**
   * setBooleanValueForProductStatus
   * @return void
   */
  private setBooleanValueForProductStatus() {
    if ( this.productForm.get( 'productStatus' ).value === ProductStatus.DEAL_WEEK ) {
      this.productForm.get( 'productStatus' ).setValue( true );
    } else {
      this.productForm.get( 'productStatus' ).setValue( false );
    }
  }
}
