import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ValidatorMessageComponent } from '../../../../shared/components/validator-message/validator-message.component';
import { RpcService } from '../../../../shared/services/rpc.service';
import { Customer } from '../../../customer/models/customer';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
   */
  constructor( private rpcService: RpcService<Customer>, private router: Router ) {}

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
    files: new FormControl('' , [
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
    this.rpcService.makePost( 'products/create', this.formData ).subscribe(
      response => {
        setTimeout( m => {
          this.router.navigate(['/products'] );
        }, 500 );
      }, error => { this.errors = error; }
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
      this.productForm.get('files').setValue( fileList[file] );
      this.formData.append('files', fileList[file] );
    });

    this.formData.append('data', JSON.stringify( this.productForm.value ) );
  }
}
