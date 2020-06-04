import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RequestAsset } from './request-asset';

@Injectable({
  providedIn: 'root'
})
export class RequestAssetService {

  constructor(private http: HttpClient) {  }

  private requestUrl = 'api/requests';

  private errorHandler(error: HttpErrorResponse) {
    return throwError(
      `${error.message}` || 'server Error'
    );
  }

  getRequests():Observable<RequestAsset[]>{
    return this.http.get<RequestAsset[]>(this.requestUrl)
    .pipe(
      catchError( this.errorHandler)
    );
  }

  makeRequest(request : RequestAsset):Observable<RequestAsset>{
    return this.http.post<RequestAsset>(this.requestUrl,request)
    .pipe(
      catchError(this.errorHandler)
    )
  }

}
