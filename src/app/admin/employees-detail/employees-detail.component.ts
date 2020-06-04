import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/employee.service';
import { Employee } from 'src/app/employee';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable,of,Subject } from 'rxjs'
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { AssetService } from 'src/app/asset.service';
import { Mobile } from 'src/app/assetClasses/mobile';
import { Laptop } from 'src/app/assetClasses/laptop';
import { DesktopPC } from 'src/app/assetClasses/desktop-pc';
import { Books } from 'src/app/assetClasses/books';
import { TEMPORARY_NAME } from '@angular/compiler/src/render3/view/util';


@Component({
  selector: 'app-employees-detail',
  templateUrl: './employees-detail.component.html',
  styleUrls: ['./employees-detail.component.css']
})
export class EmployeesDetailComponent implements OnInit {

  searchedEmployees$:Observable<Employee[]>;
  employees: Employee[];
  errorMsg: string;
  private searchTerms = new Subject<string>();

  addEmployeeForm = new FormGroup(
    {
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      pass: new FormControl('', [Validators.required, Validators.minLength(5)]),
    }
  );

  constructor(private employeeService: EmployeeService,private assetService:AssetService) {
  }

  ngOnInit(): void {
    this.getEmployees();
    this.searchedEmployees$ = this.searchTerms.pipe(
      debounceTime(300),

      distinctUntilChanged(),

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

  search(term: string): void {
    this.searchTerms.next(term);
  }

}