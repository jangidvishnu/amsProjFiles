import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AssetService } from '../asset.service';
import { switchMap, distinctUntilChanged, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-old-asset-list',
  templateUrl: './old-asset-list.component.html',
  styleUrls: ['./old-asset-list.component.css']
})
export class OldAssetListComponent implements OnInit {

  searchedAssets$: Observable<any>;
  assets: any[];
  private searchTerms = new Subject<string>();

  constructor(private assetService: AssetService) { }

  ngOnInit(): void {
    this.getAssets();
    this.searchedAssets$ = this.searchTerms.pipe(
      debounceTime(300),

      distinctUntilChanged(),

      switchMap((term: string) => this.assetService.searchOldAsset(term)),
    );
  }

  private getAssets() {
    this.assetService.getOldAssets().subscribe(
      assets => this.assets = assets
    );
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }


}
