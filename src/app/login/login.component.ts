import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service'
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { AppComponent } from '../app.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  showPassFlag = false;

  loginForm = new FormGroup({
    emailId: new FormControl('', [Validators.required, Validators.email,Validators.pattern('[A-Za-z0-9_]+@[A-Za-z]+[\.][A-Za-z]+')]),
    pass: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9@]+')]),
  });

  constructor(private employeeService: EmployeeService, private adminService: AdminService,
    private router: Router, private loginService: LoginService, private toastr: ToastrService) {
    if (this.loginService.ifSomebodyLoggedIn()) {
      this.toastr.info("Logout for go to login page","",{closeButton:true});
      this.router.navigate([this.loginService.getLoggedInRoute()]);
    }
  }

  ngOnInit(): void {
  }

  onSubmit() {
    let email: string = this.loginForm.get('emailId').value;
    let pass: string = this.loginForm.get('pass').value;
    email = email.trim();
    pass = pass.trim();
    this.loginForm.setValue({ 'emailId': "", 'pass': "" });
    this.isAdmin(email, pass);
    this.isEmployee(email, pass);
  }
  
  private isAdmin(email: string, pass: string) {
    this.adminService.getAdmin(email, pass)
      .subscribe(adm => {
        if (adm[0] != undefined) {
          this.loginService.login('admin');
          AppComponent.setLoginStatus();
          this.router.navigate(['admin']);
        }
      }, error => { console.log(error); }
      );
  }

  private isEmployee(email: string, pass: string) {
    this.employeeService.getEmployee(email, pass)
      .subscribe(emp => {
        if (!this.loginService.ifSomebodyLoggedIn() && emp[0]==undefined ){
          this.toastr.error("Wrong Credentials", "Login Error", { closeButton: true });
        }
        if (emp[0] != undefined) {
          this.loginService.login('employeeid' + emp[0].id);
          AppComponent.setLoginStatus();
          this.router.navigate(['employee/' + emp[0].id]);
        }
      }, error => { console.log(error); }
      );
  }

  changeShowPassFlag() {
    if (this.showPassFlag == false) {
      this.showPassFlag = true;
    }
    else if (this.showPassFlag == true) {
      this.showPassFlag = false;
    }
  }
}
