import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../login.service';
import { Router } from '@angular/router';
import { RequestAssetService } from 'src/app/request-asset.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  static reqCount: number;

  constructor(private loginService: LoginService, private router: Router,
    private requestAssetService: RequestAssetService, private toastr: ToastrService) {
    if (!this.loginService.ifLoggedIn('admin')) {
      this.toastr.warning("You are not logged in ! Please login and try","",{closeButton:true});
      this.router.navigate(['']);
    }
  }

  ngOnInit(): void {
    this.requestAssetService.getRequests().subscribe(
      reqs => AdminComponent.reqCount = reqs.length
    );
  }

  static setRequestCount(count: number) {
    AdminComponent.reqCount = count;
  }

  getReqCount(): number {
    return AdminComponent.reqCount;
  }
}
