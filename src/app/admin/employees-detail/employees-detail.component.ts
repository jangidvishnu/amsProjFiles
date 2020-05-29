import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/employee.service';
import { Employee } from 'src/app/employee';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable,of,Subject } from 'rxjs'
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';


@Component({
  selector: 'app-employees-detail',
  templateUrl: './employees-detail.component.html',
  styleUrls: ['./employees-detail.component.css']
})
export class EmployeesDetailComponent implements OnInit {

  searchedEmployees$:Observable<Employee[]>;
  removeEmployeeId: number;
  employees: Employee[];
  errorMsg: string;
  private searchTerms = new Subject<string>();

  addEmployeeForm = new FormGroup(
    {
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      pass: new FormControl('', [Validators.required, Validators.minLength(5)]),
    }
  );

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit(): void {
    this.getEmployees();
    this.searchedEmployees$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.employeeService.searchEmployees(term)),
    );
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
    this.employeeService.addEmployee({ name: name, pass: pass, assignedAssets: [] } as Employee)
      .subscribe(employeeAdded => this.employees.push(employeeAdded));
    this.addEmployeeForm.setValue({ name: "", pass: "" });
    this.getEmployees();
  }

  deleteEmployee() {
    if (this.removeEmployeeId != null) {
      this.employeeService.deleteEmployee(this.removeEmployeeId)
        .subscribe();
      this.getEmployees();
      this.removeEmployeeId = null;
    }
  }

  setRemoveEmployeeId(id: number) {
    this.removeEmployeeId = id;
  }

  resetRemoveEmployeeId() {
    this.removeEmployeeId = null;
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

}