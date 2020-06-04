import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/login.service';
import { AssetService } from 'src/app/asset.service';
import { Mobile } from 'src/app/assetClasses/mobile';
import { Books } from 'src/app/assetClasses/books';
import { Laptop } from 'src/app/assetClasses/laptop';
import { DesktopPC } from 'src/app/assetClasses/desktop-pc';

@Component({
  selector: 'app-single-asset',
  templateUrl: './single-asset.component.html',
  styleUrls: ['./single-asset.component.css']
})
export class SingleAssetComponent implements OnInit {

  asset: any;
  private id: number;
  issueDate: Date;
  submissionDate: Date;

  constructor(private route: ActivatedRoute, private loginService: LoginService,
    private router: Router, private assetService: AssetService) {
    if (this.loginService.ifLoggedIn('admin')) {
      // nothing to do
    }
    else {
      alert('You are not logged In! Log In first');
      this.router.navigate(['']);
    }
    this.id = +this.route.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {
    this.assetService.getAssetById(this.id).subscribe(
      (asset) => {
        this.asset = asset;
        this.issueDate = asset.issueDate;
        this.submissionDate = asset.submissionDate;
      }
    );
  }
  deleteAsset() {
    this.assetService.deleteAsset(this.asset.id)
      .subscribe();
    this.router.navigateByUrl('/admin/(adminR:assets)');
  }
  changeStatus(){
    if(this.asset?.status=="Available")
    {
      this.asset.status="On Repair";
    }
    else{
      this.asset.status="Available";
    }
    this.assetService.updateAsset(this.asset).subscribe();
  }
}
