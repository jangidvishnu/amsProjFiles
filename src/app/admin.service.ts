import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Admin } from './admin'
import { Observable,  throwError } from 'rxjs'
import { catchError ,filter } from 'rxjs/operators';

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

  getAdmin(email: string, pass: string): Observable<Admin> {
    let emailUpdated :string= email.split('@')[0];
    let url = this.adminUrl+`?emailid=`+emailUpdated+`&pass=`+pass;
    return this.http.get<Admin>(url)
      .pipe(
        filter( resultAdmin =>{
          return (resultAdmin[0]?.emailid==email)&&(resultAdmin[0]?.pass==pass)} ),
        catchError(this.errorHandler)
      ); 
  }
}
