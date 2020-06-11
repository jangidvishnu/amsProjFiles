import { Component, OnInit } from '@angular/core';
import { AssetService } from 'src/app/asset.service';
import { Mobile } from 'src/app/assetClasses/mobile';
import { Observable, Subject } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Laptop } from 'src/app/assetClasses/laptop';
import { DesktopPC } from 'src/app/assetClasses/desktop-pc';
import { Books } from 'src/app/assetClasses/books';
import { ToastrService } from 'ngx-toastr';
import { CommentStmt } from '@angular/compiler';


@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css']
})
export class AssetsComponent implements OnInit {

  searchedAssets$: Observable<any>;
  assets: any[];
  private searchTerms = new Subject<string>();

  addAssetForm = new FormGroup(
    {
      name: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z0-9 ]+')]),
      unid: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z0-9]+')]),
      buyDate: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required])
    }
  );

  constructor(private assetService: AssetService, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.getAssets();
    this.searchedAssets$ = this.searchTerms.pipe(
      debounceTime(300),

      distinctUntilChanged(),

      switchMap((term: string) => this.assetService.searchAsset(term)),
    );
  }

  private getAssets() {
    this.assetService.getAssets().subscribe(
      assets => this.assets = assets
    );
  }

  addAsset() {

    let name: string = this.addAssetForm.get('name').value;
    let unid: string = this.addAssetForm.get('unid').value;
    let category: string = this.addAssetForm.get('category').value;
    let buyDate: Date = this.addAssetForm.get('buyDate').value;

    if (category == 'laptop') {
      let laptopObj = new Laptop(name, unid, buyDate);
      this.assetService.addAsset(laptopObj)
        .subscribe(assetAdded => this.assets.push(assetAdded));
    }
    else if (category == 'desktoppc') {
      let desktoppcObj = new DesktopPC(name, unid, buyDate);
      this.assetService.addAsset(desktoppcObj)
        .subscribe(assetAdded => this.assets.push(assetAdded));

    }
    else if (category == 'book') {
      let bookObj = new Books(name, unid, buyDate);
      this.assetService.addAsset(bookObj)
        .subscribe(assetAdded => this.assets.push(assetAdded));

    }
    else if (category == 'mobile') {
      let mobileObj = new Mobile(name, unid, buyDate);
      this.assetService.addAsset(mobileObj)
        .subscribe(assetAdded => this.assets.push(assetAdded));
    }
    this.toastr.success("Asset Successfully Created", '', { closeButton: true });
    this.addAssetForm.setValue({ name: "", unid: "", category: "", buyDate: "" });
    this.getAssets();
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  getTodayDate(): string {
    var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;
      
    return [year, month, day].join('-');
  }

}
