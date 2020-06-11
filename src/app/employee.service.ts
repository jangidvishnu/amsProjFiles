import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Employee } from './employee'
import { Observable, of, throwError } from 'rxjs'
import { catchError, filter } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private http: HttpClient, private toastr: ToastrService,private loginService:LoginService
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
        filter((resultEmp) => {
          if (!this.loginService.ifSomebodyLoggedIn()&&(resultEmp == []|| resultEmp[0]?.emailid != email || resultEmp[0]?.pass != pass)) {
            this.toastr.error("Wrong Credentials","Login Error",{closeButton:true});
          }
          return (resultEmp[0]?.emailid == email) && (resultEmp[0]?.pass == pass)
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
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Employee[]>(`${this.employeesUrl}/?name=${term}`).pipe(
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
