import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AssetService } from '../asset.service';
import { switchMap, distinctUntilChanged, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.css']
})
export class AssetListComponent implements OnInit {

  searchedAssets$: Observable<any>;
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

  private getAssets() {
    this.assetService.getAssets().subscribe(
      assets => this.assets = assets
    );
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

}
