import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  private id: number;
  public employee: Employee;

  constructor(private loginService: LoginService, private route: ActivatedRoute,
    private employeeService: EmployeeService, private router: Router) {
    this.id = +this.route.snapshot.paramMap.get('id');
    if (this.loginService.ifLoggedIn('employeeid' + this.id)) {
      //nothing to do
    }
    else {
      alert("You are not Logged In ! Log in First");
      this.router.navigate(['']);
    }

  }

  ngOnInit(): void {
    this.getEmployee();
  }

  getEmployee() {
    this.employeeService.getEmployeeById(this.id)
      .subscribe(emp => this.employee =emp);
  }

}
