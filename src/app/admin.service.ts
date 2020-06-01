import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse, HttpParams } from '@angular/common/http';
import { Admin } from './admin'
import { Observable, of, throwError } from 'rxjs'
import { catchError, map, tap, filter, retry } from 'rxjs/operators';
import { get } from 'http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private adminUrl = "api/admin";
  constructor(private http: HttpClient) { }

  private errorHandler(error: HttpErrorResponse) {
    console.log(error.message);
    return throwError(
      `${error.message}` || 'server Error'
    );
  }

  getAdmin(name: string, pass: string): Observable<Admin> {
    return this.http.get<Admin>(this.adminUrl, {
      params: new HttpParams({fromString:`name=${name}&pass=${pass}`})
    })
      .pipe(
        filter( resultAdmin => (resultAdmin[0]?.name==name)&&(resultAdmin[0]?.pass==pass)  ),
        catchError(this.errorHandler)
      );
  }
}
