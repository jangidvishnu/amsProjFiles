import { Component, OnInit } from '@angular/core';
import { Employee } from '../../employee'
import { EmployeeService } from '../../employee.service'
import { LoginService } from '../../login.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {


  constructor(private loginService: LoginService, private router: Router) {
    if (this.loginService.ifLoggedIn('admin')) {
      // nothing to do
    }
    else {
      alert('You are not logged In! Log In first');
      this.router.navigate(['']);
    }
  }

  ngOnInit(): void {
  }

  
}
