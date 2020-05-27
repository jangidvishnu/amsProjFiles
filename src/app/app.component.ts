import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router, private loginService: LoginService,
    private activatedRoute: ActivatedRoute) { }
  title = 'ams';
  // routerUrl=this.router.url;
  isAdminActive = false;
  isEmployeeActive = false;

  ngOnInit(){
  }

  logout(){
    this.loginService.logout();
    this.router.navigate(['']);
  }

  onAdminClick() {
    this.isAdminActive = true;
    this.isEmployeeActive = false;
  }

  onEmployeeClick() {
    this.isAdminActive = false;
    this.isEmployeeActive = true;
  }
}
