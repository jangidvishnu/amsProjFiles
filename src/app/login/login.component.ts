import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service'
import { AdminService } from '../admin.service';
import { Admin } from '../admin';
import { Employee } from '../employee';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    name: new FormControl('', Validators.required),
    pass: new FormControl('', Validators.required),
  });

  private admin: Admin;
  private employee: Employee;

  constructor(private employeeService: EmployeeService, private adminService: AdminService) { }

  ngOnInit(): void {
  }
  onSubmit() {
    let name = this.loginForm.get('name').value;
    let pass = this.loginForm.get('pass').value;
    console.log(name,pass);
    this.adminService.getAdmin(name, pass)
      .subscribe(adm => this.admin = adm);
    console.log(this.admin);  
    this.loginForm.setValue({ 'name': "", 'pass': "" });
  }
}
