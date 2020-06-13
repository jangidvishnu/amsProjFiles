import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Mobile } from './assetClasses/mobile';
import { DesktopPC } from './assetClasses/desktop-pc';
import { Books } from './assetClasses/books';
import { Laptop } from './assetClasses/laptop';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  private assetsUrl = 'api/assets';

  constructor(private http: HttpClient) { }

  private errorHandler(error: HttpErrorResponse) {
    return throwError(
      `${error.message}` || 'server Error'
    );
  }

  getAssets(): Observable<any[]> {
    return this.http.get<any[]>(this.assetsUrl)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  getOldAssets(): Observable<any[]> {
    return this.http.get<any[]>(this.assetsUrl)
      .pipe(
        map(
          (result) => {
            let year = (new Date()).getFullYear();
            return result.filter(
              (asset) => {
                let assetBuyYear: number = (new Date(asset.buyDate)).getFullYear();
                return (year - assetBuyYear) >= 5;
              }
            )
          }
        ),
        catchError(this.errorHandler)
      );
  }

  getAssetById(id: number): Observable<any> {
    const url = `${this.assetsUrl}/${id}`
    return this.http.get<any>(url)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  addAsset(assetObj: Mobile | DesktopPC | Books | Laptop): Observable<any> {
    return this.http.post<any>(this.assetsUrl, assetObj)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  deleteAsset(id: number): Observable<{}> {
    const url = `${this.assetsUrl}/${id}`
    return this.http.delete(url)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  updateAsset(asset: Mobile | Books | Laptop | DesktopPC): Observable<any> {
    return this.http.put<any>(this.assetsUrl, asset).pipe(
      catchError(this.errorHandler)
    );
  }

  searchAsset(term: string): Observable<any[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<any[]>(this.assetsUrl)
      .pipe(
        map((result) => {
          return result.filter(
            (asset) => {
              return (asset.assetName.toLowerCase().includes(term.toLowerCase()) ||
                asset.assetCategory.toLowerCase().includes(term.toLowerCase()) ||
                asset.status.toLowerCase().includes(term.toLowerCase()) ||
                String(asset.id).includes(term));
            }
          )
        }),
        catchError(this.errorHandler)
      );
  }

  searchOldAsset(term: string): Observable<any[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<any[]>(this.assetsUrl)
      .pipe(
        map((result) => {
          let year = (new Date()).getFullYear();
          return result.filter(
            (asset) => {
              let assetBuyYear: number = (new Date(asset.buyDate)).getFullYear();
              return (asset.assetName.toLowerCase().includes(term.toLowerCase()) ||
                asset.assetCategory.toLowerCase().includes(term.toLowerCase()) ||
                asset.status.toLowerCase().includes(term.toLowerCase()) ||
                String(asset.id).includes(term) || String(asset.buyDate).includes(term)) &&
                ((year - assetBuyYear) >= 5);
            }
          )
        }),
        catchError(this.errorHandler)
      );
  }

  searchAvailableAsset(term: string): Observable<any> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<any>(this.assetsUrl)
      .pipe(
        map((result) => {
          return result.filter(
            (asset) => {
              return (asset.assetName.toLowerCase().includes(term.toLowerCase()) ||
                asset.assetCategory.toLowerCase().includes(term.toLowerCase())) &&
                (asset.status == "Available");
            }
          )
        }),
        catchError(this.errorHandler)
      );
  }
}