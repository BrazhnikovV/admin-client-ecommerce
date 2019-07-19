import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Customer } from '../models/customer';
import { catchError, tap } from 'rxjs/operators';

/**
 * @classdesc - сервис для получения данных ...
 */
@Injectable({ providedIn: 'root' })
export class RpcService {

  /**
   *  @var string apiUrl - url адрес rest api(rpc)
   */
  private apiUrl = 'http://localhost:8086/api/';

  /**
   *  @var string token - url адрес rest api(rpc)
   */
  private token = '8d5dd466-226c-419b-ac04-a5ccc6b42d82';

  /**
   * constructor - конструктор
   * @param http - объект для работы с http
   */
  constructor( private http: HttpClient) {}

  /**
   * getCategories - получить список категорий
   * @param method - название метода HTTP протокола
   * @param path   - путь определяющий сущность и операцию выполняемою на дней
   * @param data   - набор данных, которые необходимо передать серверу
   * @return Observable<any> | throwError( error )
   */
  public makeRequest( method: string, path: string, data?: any ): Observable<any> {
    return this.http[method]<Customer[]>( this.apiUrl + path, this.getAuthHeaders() ).pipe(
      tap(response => {}),
      catchError(error => {
        return throwError( error );
      })
    );
  }

  /**
   * getOrders - получить данные от сервера
   * @return void
   */
  private getAuthHeaders(): {} {

    const hash = btoa( sessionStorage.getItem('token') + ':' );
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.token
      })
    };

    return httpOptions;
  }
}

