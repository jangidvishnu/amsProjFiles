import { Component, OnInit } from '@angular/core';
import { AssetHistoryService } from 'src/app/asset-history.service';
import { AssetHistory } from 'src/app/asset-history';
import { LoginService } from 'src/app/login.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-asset-history',
  templateUrl: './asset-history.component.html',
  styleUrls: ['./asset-history.component.css']
})
export class AssetHistoryComponent implements OnInit {

  assetHistory: AssetHistory[]=[];
  private id: number;

  constructor(private assetHistoryService: AssetHistoryService, private router: Router,
    private loginService: LoginService, private toastr: ToastrService, private route: ActivatedRoute,

  ) {
    if (!this.loginService.ifLoggedIn('admin')) {
      this.toastr.warning("You are not logged in ! Please login and try", "", { closeButton: true });
      this.router.navigate(['']);
    }
    this.id = +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getHistory();
  }

  private getHistory() {
    this.assetHistoryService.getHistoryByAssetId(this.id).subscribe(
      (res) =>{
        for (let his of res){
          if (his.assetId==this.id){
            this.assetHistory.push(his);
          }
        }
       }
    );
  }
}
