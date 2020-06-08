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

  static loginStatus:string;

  constructor(private router: Router, private loginService: LoginService) { }
  title = 'AMS';
  ngOnInit(){
    AppComponent.loginStatus="loggedout";
  }

  logout(){
    this.loginService.logout();
    AppComponent.loginStatus="loggedout";
    this.router.navigate(['']);
  }
  static setLoginStatus(){
    AppComponent.loginStatus="loggedin";
  }
  getLoginStatus(){
    return AppComponent.loginStatus;
  }
}
