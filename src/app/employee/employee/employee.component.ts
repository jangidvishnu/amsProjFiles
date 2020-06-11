import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/login.service';
import { Employee } from 'src/app/employee';
import { EmployeeService } from 'src/app/employee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  private id: number;
  public employee: Employee;


  constructor(private loginService: LoginService, private route: ActivatedRoute,
    private employeeService: EmployeeService, private router: Router,
    private toastr: ToastrService) {
      
    this.id = +this.route.snapshot.paramMap.get('id');
    if (!this.loginService.ifLoggedIn('employeeid' + this.id)) {
      this.toastr.warning("You are not logged in ! Please login and try", "", { closeButton: true });
      this.router.navigate(['']);
    }
  }

  ngOnInit(): void {
    this.getEmployee();
    this.router.navigateByUrl('/employee/' + this.id + '/(employeeR:dashboard)');
  }

  getEmployee() {
    this.employeeService.getEmployeeById(this.id)
      .subscribe(emp => {
        this.employee = emp;
      });
  }
}
