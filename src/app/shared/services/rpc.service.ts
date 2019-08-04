import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

/**
 * @classdesc - сервис для получения данных ...
 */
@Injectable({ providedIn: 'root' })
export class RpcService<T extends {}> {

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
   * makePost -
   * @param path   - путь определяющий сущность и операцию выполняемою на дней
   * @param data   - набор данных, которые необходимо передать серверу
   * @return Observable<any> | throwError( error )
   */
  public makePost( path: string, data: T ): Observable<any> {
    return this.http.post<T[]>( this.apiUrl + path, data, this.getAuthHeaders() ).pipe(
      map( event => this.caseHttpEventType( event ) ),
      catchError(error => {
        return throwError( 'Error: obviously invalid data structure.' );
      })
    );
  }

  /**
   * makePostWithFiles -
   * @param path   - путь определяющий сущность и операцию выполняемою на дней
   * @param data   - набор данных, которые необходимо передать серверу
   * @return Observable<any> | throwError( error )
   */
  public makePostWithFiles( path: string, data: any ): Observable<any> {
    return this.http.post<T[]>( this.apiUrl + path, data, this.getAuthHeaders() ).pipe(
      map( event => this.caseHttpEventType( event ) ),
      catchError(error => {
        return throwError( 'Error: obviously invalid data structure.' );
      })
    );
  }

  /**
   * makePut -
   * @param path   - путь определяющий сущность и операцию выполняемою на дней
   * @param data   - набор данных, которые необходимо передать серверу
   * @return Observable<any> | throwError( error )
   */
  public makePut( path: string, data: T ): Observable<any> {
    return this.http.put<T[]>( this.apiUrl + path, data, this.getAuthHeaders() ).pipe(
      map( event => this.caseHttpEventType( event ) ),
      catchError(error => {
        return throwError( error );
      })
    );
  }

  /**
   * makePutWithFiles - отправить PUT - запрос к rest api вместе с файлами
   * @param path   - путь определяющий сущность и операцию выполняемою на дней
   * @param data   - набор данных, которые необходимо передать серверу
   * @return Observable<any> | throwError( error )
   */
  public makePutWithFiles( path: string, data: any ): Observable<any> {
    return this.http.put<T[]>( this.apiUrl + path, data, this.getAuthHeaders() ).pipe(
      map( event => this.caseHttpEventType( event ) ),
      catchError(error => {
        return throwError( 'Error: obviously invalid data structure.' );
      })
    );
  }

  /**
   * makeRequest -
   * @param method - название метода HTTP протокола
   * @param path   - путь определяющий сущность и операцию выполняемою на дней
   * @return Observable<any> | throwError( error )
   */
  public makeRequest( method: string, path: string ): Observable<any> {
    return this.http[method]<T[]>( this.apiUrl + path, this.getAuthHeaders() ).pipe(
      map( event => {
          return this.caseHttpEventType( event );
      }),
      catchError(error => {
        return throwError( error );
      })
    );
  }

  /**
   * getAuthHeaders - сформировать объект с заголовками
   * @return void
   */
  private getAuthHeaders(): {} {

    const hash = btoa( sessionStorage.getItem('token') + ':' );
    const httpOptions = {
      headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token}),
      reportProgress: true,
      observe: 'events',
    };

    return httpOptions;
  }

  /**
   * caseHttpEventType - обрабатывает процесс загрузки(отправки) данных на сервер
   * @param event - событие процесса
   */
  private caseHttpEventType( event ): {} {
    switch (event['type']) {
      case HttpEventType.DownloadProgress:
        const progress = Math.round(100 * event['loaded'] / event['total']);
        return { status: 'progress', message: progress };
      case HttpEventType.Response:
        return event['body'];
      default:
        return event;
    }
  }
}

