import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ValidatorMessageComponent } from '../../../../shared/components/validator-message/validator-message.component';
import { RpcService } from '../../../../shared/services/rpc.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product';
import {ProductStatus} from '../../enums/product-status.enum';

/**
 * @classdesc - CreateComponent компонент страницы создания продукта
 */
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  /**
   * @var categoryId: number - идентификатор категории к которой принадлежит продукт
   */
  private categoryId: number;

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
   * constructor
   * @param rpcService - сервис
   * @param activatedRoute -
   * @param router -
   */
  constructor( private rpcService: RpcService<Product>, private activatedRoute: ActivatedRoute, private router: Router ) {
    this.categoryId = activatedRoute.snapshot.params['categoryId'];
  }

  /**
   *  @var customerForm: FormGroup - группа валидируемых полей
   */
  private productForm: FormGroup = new FormGroup({
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
      Validators.min(1 ),
      Validators.max(99 )
    ]),
    amount: new FormControl('' , [
      Validators.required,
      Validators.min(1 ),
      Validators.max(999 )
    ]),
    files: new FormControl('' , [
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
   *  @var productStatus: string -
   */
  private productStatus: string;

  /**
   * onSubmit - перехватываем события откравки формы
   * @return void
   */
  onSubmit() {
    this.rpcService.makePostWithFiles( 'products/create/' + this.categoryId, this.formData ).subscribe(
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
  ngOnInit() {}

  /**
   * handleUploader - обработать событие выбора файлов для загрузки
   * @param event - событие выбора файлов
   */
  private handleUploader( event ) {

    const fileList: FileList = event.originalEvent.target.files;
    Object.keys( fileList ).map( file => {
      this.formData.append('files', fileList[file] );
    });

    this.productForm.get('files').setValue( '--' );

    // !Fixme необходимо формировать this.formData и при изменении полей
    this.productForm.get('productStatus').setValue( this.productStatus )
    this.formData.append('data', JSON.stringify( this.productForm.value ) );
  }

  /**
   * handleChangeInputSwitch - слушать событие клика по перекличателю - "Сделка недели"
   * @param $event - объкт события мыши
   * @return void
   */
  handleChangeInputSwitch( $event: MouseEvent ) {
    this.productStatus = ProductStatus.NORMAL;
    if ( $event['checked'] ) {
      this.productStatus = ProductStatus.DEAL_WEEK;
    }
  }
}
