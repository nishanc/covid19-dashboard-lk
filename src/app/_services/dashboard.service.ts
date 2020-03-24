import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HpbResponse } from '../_interfaces/response';
import { LkDataChanges } from '../_interfaces/lkdatachanges';
import { ApiResponse } from '../_interfaces/apiresponse';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  base = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getData() {
    let options = null;
    const headers = new HttpHeaders({'Content-type': 'application/json'});
    options = { headers };
    return this.http.get<ApiResponse[]>(this.base + 'all/12', options).pipe(map(response => response))
    .pipe(
      catchError(this.handleError)
    );
  }

  getLastData() {
    let options = null;
    const headers = new HttpHeaders({'Content-type': 'application/json'});
    options = { headers };
    return this.http.get<ApiResponse>(this.base + 'all/1', options).pipe(map(response => response))
    .pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    // console.log('error', error);
    if (error.status === 404) {
      return throwError('No user matches for specified screen name');
    }
    if (error.status === 400) {
      return throwError(error.error);
    }
    if (error.status === 500) {
      return throwError('Server error occured, please tr again');
    }
  }

}
