import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/login.service';
import { AssetService } from 'src/app/asset.service';
import { Mobile } from 'src/app/assetClasses/mobile';
import { Books } from 'src/app/assetClasses/books';
import { Laptop } from 'src/app/assetClasses/laptop';
import { DesktopPC } from 'src/app/assetClasses/desktop-pc';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-single-asset',
  templateUrl: './single-asset.component.html',
  styleUrls: ['./single-asset.component.css']
})
export class SingleAssetComponent implements OnInit {

  asset: Mobile | Books | Laptop | DesktopPC;
  private id: number;

  editAssetForm = new FormGroup({
    newName: new FormControl('',[Validators.pattern('[a-zA-Z0-9 ]+')]),
    newUniqueId: new FormControl('',[Validators.pattern('[a-zA-Z0-9]+')])
  }
  );

  constructor(private route: ActivatedRoute, private loginService: LoginService,
    private router: Router, private assetService: AssetService, private toastr: ToastrService) {

    if (!this.loginService.ifLoggedIn('admin')) {
      this.toastr.warning("You are not logged in ! Please login and try", "", { closeButton: true });
      this.router.navigate(['']);
    }
    this.id = +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.assetService.getAssetById(this.id).subscribe(
      (asset) => {
        this.asset = asset;
        this.editAssetForm.setValue({ newName: asset.assetName, newUniqueId: asset.assetUniqueId });
      }
    );
  }

  deleteAsset() {
    this.assetService.deleteAsset(this.asset.id)
      .subscribe();
    this.toastr.success("Asset Deleted","",{closeButton:true});  
    this.router.navigateByUrl('/admin/(adminR:assets)');
  }

  editAsset() {
    this.asset.assetName = this.editAssetForm.get('newName').value;
    this.asset.assetUniqueId = this.editAssetForm.get('newUniqueId').value;
    this.assetService.updateAsset(this.asset).subscribe();
    this.toastr.success("Edit Asset Successfully","",{closeButton:true});
    this.editAssetForm.setValue({ newName: this.asset.assetName, newUniqueId: this.asset.assetUniqueId });
  }

  changeStatus() {
    if (this.asset?.status == "Available") {
      this.asset.status = "On Repair";
    }
    else {
      this.asset.status = "Available";
    }
    this.assetService.updateAsset(this.asset).subscribe();
    this.toastr.success('Status Changed','',{closeButton:true});
  }

}
