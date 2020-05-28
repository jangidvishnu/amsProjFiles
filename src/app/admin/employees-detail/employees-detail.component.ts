import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/employee.service';
import { Employee } from 'src/app/employee';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-employees-detail',
  templateUrl: './employees-detail.component.html',
  styleUrls: ['./employees-detail.component.css']
})
export class EmployeesDetailComponent implements OnInit {
  
  employees: Employee[];
  errorMsg: string;

  addEmployeeForm = new FormGroup(
    {
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      pass: new FormControl('', [Validators.required, Validators.minLength(5)]),
    }
  );

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

  addEmployee() {
    let name: string = this.addEmployeeForm.get('name').value;
    let pass: string = this.addEmployeeForm.get('pass').value;
    this.employeeService.addEmployee({ name: name, pass: pass,assignedAssets:[] } as Employee)
      .subscribe(employeeAdded => this.employees.push(employeeAdded)); 
    this.addEmployeeForm.setValue({name:"",pass:""});  
    this.getEmployees();
  }
  private deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id)
      .subscribe();
  }
}
