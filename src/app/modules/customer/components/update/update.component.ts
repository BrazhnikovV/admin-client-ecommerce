'use strict';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ValidatorMessageComponent } from '../../../../shared/components/validator-message/validator-message.component';
import { RpcService } from '../../../../shared/services/rpc.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Customer } from '../../models/customer';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  /**
   * @var viewChildren: QueryList<ValidatorMessageComponent> - список компонентов
   * для отображения сообщений валидатора
   */
  @ViewChildren( ValidatorMessageComponent )
  private viewChildren: QueryList<ValidatorMessageComponent>;

  /**
   * @var id: number - идентификатор
   */
  private id: number;

  /**
   * constructor
   * @param rpcService - сервис
   */
  constructor( private rpcService: RpcService<Customer>, private router: ActivatedRoute ) {
    this.id = router.snapshot.params['id'];
  }

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
    this.rpcService.makePost( 'customers/create', this.customerForm.value ).subscribe(
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
  ngOnInit() {
    if ( this.id > 0 ) {
      const controls = this.customerForm.controls;
      this.rpcService.makeRequest('get', 'customers/' + this.id ).subscribe(( response ) => {
        Object.keys( response ).filter(key => controls.hasOwnProperty( key ) ).map( ( key ) => {
          this.customerForm.get( key ).setValue( response[key] );
        });
      });
    }
  }
}
