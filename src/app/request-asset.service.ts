import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, filter } from 'rxjs/operators';
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
    return this.http.get<RequestAsset[]>(this.requestUrl,
      {
        params: new HttpParams({ fromString: `requestStatus=Pending` })
      })
    .pipe(
      catchError( this.errorHandler)
    );
  }

  getRequestsOfEmp(id:number):Observable<RequestAsset[]>{
    return this.http.get<RequestAsset[]>(this.requestUrl,
      {
        params: new HttpParams({ fromString:'requestEmployeeId='+id
        })
      }
    )
    .pipe(
      filter(
        (reqs) =>{ 
          return reqs[0]?.requestEmployeeId==id;}
      ),
      catchError(this.errorHandler)
    );
  }

  makeRequest(request : RequestAsset):Observable<RequestAsset>{
    return this.http.post<RequestAsset>(this.requestUrl,request)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getRequestById(reqId:number):Observable<RequestAsset>
  {
    const url = `${this.requestUrl}/${reqId}`
    return this.http.get<RequestAsset>(url).pipe(
      catchError(this.errorHandler)
    );
  }

  updateRequest(request :RequestAsset):Observable<RequestAsset>
  {
    return this.http.put<RequestAsset>(this.requestUrl,request).
    pipe(
      catchError(this.errorHandler)
    );
  }

}
