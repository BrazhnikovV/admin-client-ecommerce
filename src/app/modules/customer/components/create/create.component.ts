'use strict';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ValidatorMessageComponent } from '../../../../shared/components/validator-message/validator-message.component';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { RpcService } from '../../services/rpc.service';

/**
 * @classdesc - CreateComponent компонент страницы создания клиента
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
   * constructor
   * @param rpcService - сервис
   */
  constructor( private rpcService: RpcService ) {}

  /**
   *  @var errors: [] - массив ошибок, полученных при аутентификации
   */
  private errors: [];

  /**
   *  @var customerForm: FormGroup - группа валидируемых полей
   */
  private customerForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(4 ),
      Validators.maxLength(64 ),
      Validators.email
    ]),
    firstName: new FormControl('' , [
      Validators.required,
      Validators.minLength(4 ),
      Validators.maxLength(64 )
    ]),
    lastName: new FormControl('' , [
      Validators.required,
      Validators.minLength( 4 ),
      Validators.maxLength(64 )
    ]),
    password: new FormControl('' , [
      Validators.required,
      Validators.minLength( 4 ),
      Validators.maxLength(64 )
    ]),
    confirmpass: new FormControl('' , [
      Validators.required,
      Validators.minLength( 4 ),
      Validators.maxLength(64 ),
      this.forbiddenNameValidator()
    ]),
    role: new FormControl('' , [
      Validators.required,
      Validators.minLength( 4 ),
      Validators.maxLength(32 )
    ]),
    username: new FormControl('' , [
      Validators.required,
      Validators.minLength( 4 ),
      Validators.maxLength(64 )
    ]),
  });

  /**
   * onSubmit - перехватываем события откравки формы
   * @return void
   */
  onSubmit() {
    console.log('### CategoryCreateComponent => onSubmit()');
    this.rpcService.makeRequest( 'post',  '', this.customerForm.value ).subscribe(
      response => { console.log(response); }, error => { this.errors = error; }
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
   * forbiddenNameValidator
   * @return ValidatorFn
   */
  private forbiddenNameValidator(): ValidatorFn {
    return ( control: AbstractControl ): { [key: string]: any } | null => {
      let pass: String = '';
      if ( this.customerForm !== undefined ) {
        pass = this.customerForm.get('password').value;
      }
      return ( pass !== control.value ) ? { confirmpass: 'Passwords do not match' } : null;
    };
  }
}
