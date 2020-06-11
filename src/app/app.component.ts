import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  static loginStatus: string;
  title = 'AMS';

  constructor(private router: Router, private loginService: LoginService) { }


  ngOnInit() {
    AppComponent.loginStatus = "loggedout";
  }

  logout() {
    this.loginService.logout();
    AppComponent.loginStatus = "loggedout";
    this.router.navigate(['']);
  }

  getLoginStatus() {
    return AppComponent.loginStatus;
  }

  static setLoginStatus() {
    AppComponent.loginStatus = "loggedin";
  }

}
