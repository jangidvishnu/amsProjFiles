import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders ,HttpErrorResponse } from '@angular/common/http';
import { Employee } from './employee'
import { Observable ,of, throwError } from 'rxjs'
import { catchError, map, tap  } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private http: HttpClient,
  ) { }

  private employeesUrl = 'api/employees'; 

  private errorHandler(error : HttpErrorResponse)
  {
    return throwError(
      `${error.message}` || 'server Error'
    );
  }
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.employeesUrl)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  addEmployee(employee :Employee): Observable<Employee>{
    return this.http.post<Employee>(this.employeesUrl,employee)
    .pipe(
      catchError(this.errorHandler)
    );
  }
}
