import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HpbResponse } from '../_interfaces/response';

@Injectable({
  providedIn: 'root'
})
export class HpbService {
  base = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getData() {
    let options = null;
    const headers = new HttpHeaders({'Content-type': 'application/json'});
    options = { headers };
    return this.http.get<HpbResponse>(this.base, options).pipe(map(response => response))
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
