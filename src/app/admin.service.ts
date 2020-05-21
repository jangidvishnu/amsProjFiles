import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders ,HttpErrorResponse } from '@angular/common/http';
import { Admin } from './admin'
import { Observable ,of, throwError } from 'rxjs'
import { catchError, map, tap, filter, retry  } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private adminUrl="api/admin";
  constructor(private http: HttpClient,) { }

  private errorHandler(error : HttpErrorResponse)
  {
    console.log(error.message);
    return throwError(
      `${error.message}` || 'server Error'
    );
  }

  getAdmin(name:string,pass:string):Observable<Admin>{
   return this.http.get<Admin>(`${this.adminUrl}/?name=${name}&pass=${pass}`)
    .pipe(
      retry(2),
      catchError(this.errorHandler)
      );
  }
}
