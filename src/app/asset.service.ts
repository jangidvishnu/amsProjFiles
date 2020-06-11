import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError, of, concat } from 'rxjs';
import { catchError } from 'rxjs/operators';
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

  searchAsset(term: string): Observable<any> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<any[]>(`${this.assetsUrl}/?assetName=${term}`).pipe(
      catchError(this.errorHandler)
    );
  }

  searchAssetByCategory(term: string): Observable<any> {
    if (!term.trim()) {
      return of([]);
    }
    return concat(this.http.get<any>(this.assetsUrl, {
      params: new HttpParams({ fromString: `assetCategory=${term}&status=Available` })
    }), this.http.get<any>(this.assetsUrl, {
      params: new HttpParams({ fromString: `assetName=${term}&status=Available` })
    })).pipe(
      catchError(this.errorHandler)
    );
  }
}