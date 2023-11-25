import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  SELECTION_POOL_API,
  SP_APPLICANT_API,
  SP_SYNC_API,
} from 'src/app/constants/api';
import { getToken } from 'src/app/constants/globalMethods';

@Injectable({
  providedIn: 'root',
})
export class PiscineService {
  constructor(private http: HttpClient) {}

  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + getToken(),
  });
  // get applicants api
  getSPApplicants(): Observable<any> {
    try {
      console.log(this.httpOptions);
      // get the data from the url
      var http = this.http
        .get<any>(SELECTION_POOL_API, { headers: this.httpOptions })
        .pipe(map((data) => data));

      http.subscribe((data) => {
        console.log(data);
      });
      return http;
    } catch (err) {
      console.log(err);
      // disable the loader and return if there is an error
      return err;
    }
  }

  // get specific applicant by
  getSpApplicant(platformId): Observable<any> {
    try {
      // add the platform id
      var http = this.http
        .get<any>(SP_APPLICANT_API + '?platformId=' + platformId, {
          headers: this.httpOptions,
        })
        .pipe(map((data) => data));

      http.subscribe((data) => {
        console.log(data);
      });
      return http;
    } catch (err) {
      console.log(err);
      // disable the loader and return if there is an error
      return err;
    }
  }

  syncSPApplicants(data): Observable<any> {
    try {
      // add the platform id
      var http = this.http
        .post<any>(SP_SYNC_API, data, {
          headers: this.httpOptions,
        })
        .pipe(map((data) => data));

      http.subscribe((data) => {
        console.log(data);
      });
      return http;
    } catch (err) {
      console.log(err);
      // disable the loader and return if there is an error
      return err;
    }
  }
}
