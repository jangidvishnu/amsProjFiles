import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee'
import { EmployeeService } from '../employee.service'
import { LoginService } from '../login.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  employees: Employee[];
  errorMsg: string;

  constructor(private employeeService: EmployeeService, private loginService: LoginService, private router: Router) {
    if (this.loginService.ifLoggedIn('admin')) {
      // nothing to do
    }
    else {
      alert('You are not logged In! Log In first');
      this.router.navigate(['']);
    }
  }

  ngOnInit(): void {
    this.getEmployees();
  }

  private getEmployees() {
    this.employeeService.getEmployees()
      .subscribe(employees => this.employees = employees,
        error => this.errorMsg = error
      );
  }

  private addEmployee(employee: Employee) {
    this.employeeService.addEmployee(employee)
      .subscribe(employeeAdded => this.employees.push(employeeAdded));
  }
  private deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id)
      .subscribe();
  }
}
