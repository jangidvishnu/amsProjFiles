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

  constructor(private router: Router, private loginService: LoginService) { }
  title = 'AMS';
  ngOnInit(){
  }

  logout(){
    this.loginService.logout();
    this.router.navigate(['']);
  }
}
