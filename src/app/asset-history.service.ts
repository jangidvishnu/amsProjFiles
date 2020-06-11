import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AssetHistory } from './asset-history';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, filter } from 'rxjs/operators';

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
      filter((result) => {
        return (result[0]?.id == id);
      }),
      catchError(this.errorHandler)
    );
  }
}
