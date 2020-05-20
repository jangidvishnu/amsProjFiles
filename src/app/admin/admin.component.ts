import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee'
import { EmployeeService } from '../employee.service'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  employees: Employee[];
  errorMsg: String;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  private getEmployees() {
    this.employeeService.getEmployees()
      .subscribe(employees => this.employees = employees,
        error => this.errorMsg = error
      );
  };

  private addEmployee(employee: Employee) {
    this.employeeService.addEmployee(employee )
      .subscribe(employeeAdded => this.employees.push(employeeAdded))
  };
}
