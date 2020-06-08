import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../login.service';
import { Router } from '@angular/router';
import { RequestAssetService } from 'src/app/request-asset.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  static reqCount: number;

  constructor(private loginService: LoginService, private router: Router,
    private requestAssetService: RequestAssetService) {
    if (this.loginService.ifLoggedIn('admin')) {
      // nothing to do
    }
    else {
      alert('You are not logged In! Log In first');
      this.router.navigate(['']);
    }

  }

  ngOnInit(): void {
    this.requestAssetService.getRequests().subscribe(
      reqs => AdminComponent.reqCount=reqs.length 
    );
  }

  static setRequestCount(count : number){
    AdminComponent.reqCount=count;
  }

  getReqCount():number{
    return AdminComponent.reqCount;
  }
  
}
