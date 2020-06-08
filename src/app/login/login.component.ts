import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service'
import { AdminService } from '../admin.service';
import { Admin } from '../admin';
import { Employee } from '../employee';
import { Router } from '@angular/router';
import { error } from 'protractor';
import { LoginService } from '../login.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    pass: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });

  constructor(private employeeService: EmployeeService, private adminService: AdminService,
    private router: Router, private loginService: LoginService) {
    if (this.loginService.ifSomebodyLoggedIn()) {
      this.router.navigate([this.loginService.getLoggedInRoute()]);
    }
  }

  ngOnInit(): void {
  }
  onSubmit() {
    let name: string = this.loginForm.get('name').value;
    let pass: string = this.loginForm.get('pass').value;
    name = name.trim();
    pass = pass.trim();
    this.loginForm.setValue({ 'name': "", 'pass': "" });
    this.isAdmin(name, pass);
    this.isEmployee(name, pass);
  }
  private isAdmin(name: string, pass: string) {
    this.adminService.getAdmin(name, pass)
      .subscribe(adm => {
        if (adm[0] != undefined) {
          this.loginService.login('admin');
          AppComponent.setLoginStatus();
          this.router.navigate(['admin']);
        }

      }, error => { console.log(error); }
      );
  }

  private isEmployee(name: string, pass: string) {
    this.employeeService.getEmployee(name, pass)
      .subscribe(emp => {
        if (emp[0] != undefined) {
          this.loginService.login('employeeid' + emp[0].id);
          AppComponent.setLoginStatus();
          this.router.navigate(['employee/' + emp[0].id]);
        }
      }, error => { console.log(error); }
      );
  }
}
