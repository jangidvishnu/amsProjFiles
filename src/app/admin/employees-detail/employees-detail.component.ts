import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/employee.service';
import { Employee } from 'src/app/employee';

@Component({
  selector: 'app-employees-detail',
  templateUrl: './employees-detail.component.html',
  styleUrls: ['./employees-detail.component.css']
})
export class EmployeesDetailComponent implements OnInit {

  employees: Employee[];
  errorMsg: string;
  constructor(private employeeService: EmployeeService) { }

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
