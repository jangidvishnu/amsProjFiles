import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ams';
  isAdminActive = false;
  onAdminClick(){
    this.isAdminActive=true;
  }
  onEmployeeClick(){
    this.isAdminActive=false;
  }

}
