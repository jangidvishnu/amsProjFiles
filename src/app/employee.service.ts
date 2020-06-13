import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Employee } from './employee'
import { Observable, of, throwError } from 'rxjs'
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private http: HttpClient
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

  getEmployeeById(id: number): Observable<Employee> {
    const url = `${this.employeesUrl}/${id}`
    return this.http.get<Employee>(url)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  getEmployee(email: string, pass: string): Observable<Employee[]> {
    let emailUpdated: string = email.split('@')[0];
    let url = this.employeesUrl + `?emailid=` + emailUpdated + `&pass=` + pass;
    return this.http.get<Employee[]>(url)
      .pipe(
        map((result) => {
          return result.filter(
            emp => emp.emailid == email && emp.pass == pass
          )
        }),
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


  searchEmployees(term: string): Observable<Employee[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Employee[]>(this.employeesUrl).pipe(
      map(
        (result) => {
          return result.filter(
            (employee) => {
              return employee.name.toLowerCase().includes(term.toLowerCase()) ||
                employee.id.toString().includes(term);
            }
          )
        }
      ),
      catchError(this.errorHandler)
    );
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(this.employeesUrl, employee).
      pipe(
        catchError(this.errorHandler)
      );
  }
}
