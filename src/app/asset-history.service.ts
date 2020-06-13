import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AssetHistory } from './asset-history';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError ,map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AssetHistoryService {
  
  private assetHistoryUrl :string= 'api/assetHistory';
  constructor(private http : HttpClient ) { }

  private errorHandler(error: HttpErrorResponse) {
    return throwError(
      `${error.message}` || 'server Error'
    );
  }

  getHistoryByAssetId(id:number):Observable<AssetHistory[]>
  { 
    let url = this.assetHistoryUrl+'?assetId='+id;
    return this.http.get<AssetHistory[]>(url).
    pipe(
      map(result => result.filter(
        assetHistory => assetHistory.assetId==id
      ) ),
      catchError(this.errorHandler)
    );
  }

  addAssetHistory(assetHist:AssetHistory):Observable<AssetHistory>
  {
    return this.http.post<AssetHistory>(this.assetHistoryUrl,assetHist).
    pipe(
      catchError(this.errorHandler)
    );
  }
}
