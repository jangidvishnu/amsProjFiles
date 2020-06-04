import { Component, OnInit } from '@angular/core';
import { AssetService } from 'src/app/asset.service';
import { Mobile } from 'src/app/assetClasses/mobile';
import { Observable, Subject } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Laptop } from 'src/app/assetClasses/laptop';
import { DesktopPC } from 'src/app/assetClasses/desktop-pc';
import { Books } from 'src/app/assetClasses/books';


@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css']
})
export class AssetsComponent implements OnInit {

  searchedAssets$: Observable<any>;
  removeAssetId: number;
  assets: any[];
  private searchTerms = new Subject<string>();

  constructor(private assetService: AssetService) { }

  ngOnInit(): void {
    this.getAssets();
    this.searchedAssets$ = this.searchTerms.pipe(
      debounceTime(300),

      distinctUntilChanged(),

      switchMap((term: string) => this.assetService.searchAsset(term)),
    );
  }

  addAssetForm = new FormGroup(
    {
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      unid: new FormControl('', [Validators.required, Validators.minLength(5)]),
      category: new FormControl('',[Validators.required])
    }
  );


  private getAssets() {
    this.assetService.getAssets().subscribe(
      assets => this.assets = assets
    );
  }

  addAsset() {
    let name: string = this.addAssetForm.get('name').value;
    let unid: string = this.addAssetForm.get('unid').value;
    let category:string=this.addAssetForm.get('category').value;
    if (category=='laptop'){
      let laptopObj= new Laptop(name,unid);
      this.assetService.addAsset(laptopObj)
      .subscribe(assetAdded => this.assets.push(assetAdded));
    }
    else if( category=='desktoppc')
    {
      let desktoppcObj=new DesktopPC(name,unid);
      this.assetService.addAsset(desktoppcObj)
      .subscribe(assetAdded => this.assets.push(assetAdded));

    }
    else if( category=='book')
    {
      let bookObj=new Books(name,unid);
      this.assetService.addAsset(bookObj)
      .subscribe(assetAdded => this.assets.push(assetAdded));
      
    }
    else if( category=='mobile')
    {
      let mobileObj=new Mobile(name,unid);
      this.assetService.addAsset(mobileObj)
      .subscribe(assetAdded => this.assets.push(assetAdded));
    }
    this.addAssetForm.setValue({ name: "", unid: "",category:"" });
    this.getAssets();
  }

  deleteAsset() {
    if (this.removeAssetId != null) {
      this.assetService.deleteAsset(this.removeAssetId)
        .subscribe();
      this.getAssets();
      this.removeAssetId = null;
    }
  }

  setRemoveAssetId(id: number) {
    this.removeAssetId=id;
  }

  resetRemoveAssetId() {
    this.removeAssetId = null;
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }
}
