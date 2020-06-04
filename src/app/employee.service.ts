import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Employee } from './employee'
import { Observable, of, throwError } from 'rxjs'
import { catchError, map, tap, filter, elementAt } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private http: HttpClient,
  ) { }

  private employeesUrl = 'api/employees';

  private errorHandler(error: HttpErrorResponse) {
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

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.employeesUrl, employee)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  deleteEmployee(id: number): Observable<{}> {
    const url = `${this.employeesUrl}/${id}`
    return this.http.delete(url)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  getEmployeeById(id: number): Observable<Employee> {
    const url = `${this.employeesUrl}/${id}`
    return this.http.get<Employee>(url)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  getEmployee(name: string, pass: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.employeesUrl, {
      params: new HttpParams({ fromString: `name=${name}&pass=${pass}` })
    })
      .pipe(
        filter( (resultEmp) =>{
          return(resultEmp[0]?.name == name) && (resultEmp[0]?.pass == pass)}),
        catchError(this.errorHandler)
      );
  }

  searchEmployees(term: string): Observable<Employee[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Employee[]>(`${this.employeesUrl}/?name=${term}`).pipe(
      catchError(this.errorHandler)
    );
  }

  updateEmployee(employee:Employee):Observable<Employee>{
    return this.http.put<Employee>(this.employeesUrl,employee).
    pipe(
      catchError(this.errorHandler)
    );
  }
}
