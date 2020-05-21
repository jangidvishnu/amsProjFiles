import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router:Router){}
  title = 'ams';
  // routerUrl=this.router.url;
  isAdminActive = false;
  isEmployeeActive=false;
  onAdminClick(){
    this.isAdminActive=true;
    this.isEmployeeActive=false;
  }
  onEmployeeClick(){
    this.isAdminActive=false;
    this.isEmployeeActive=true;
  }
}
