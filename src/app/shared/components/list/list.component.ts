import { Component, OnInit } from '@angular/core';
import { RpcService } from '../../../modules/customer/services/rpc.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [RpcService]
})
export class ListComponent implements OnInit {

  /**
   * constructor - конструктор
   */
  constructor( private rpcService: RpcService ) { }

  /**
   * @var cols: []
   */
  private cols = [
    { field: 'id',        header: 'id',        class: 'th-btn' },
    { field: 'username',  header: 'username',  class: '' },
    { field: 'email',     header: 'email',     class: '' },
    { field: 'firstName', header: 'firstname', class: '' },
    { field: 'lastName',  header: 'lastname',  class: '' },
    { field: 'role',      header: 'role',      class: '' }
  ];

  /**
   * @var users: []
   */
  private users: [];

  ngOnInit() {
    this.rpcService.makeRequest( 'get', 'customers/list' ).subscribe(( response ) => {
      this.users = response;
    });
  }
}
