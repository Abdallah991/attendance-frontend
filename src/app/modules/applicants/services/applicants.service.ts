import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { APPLICANTS_API, APPLICANTS_SYNC_API } from 'src/app/constants/api';
import { httpOptions } from 'src/app/constants/constants';

@Injectable({
  providedIn: 'root',
})
export class ApplicantsService {
  constructor(private http: HttpClient) {}

  // get applicants api
  getApplicants(data: any): Observable<any> {
    try {
      // get the data from the url

      console.log(data);
      var http = this.http
        .post<any>(APPLICANTS_API, data, { headers: httpOptions })
        .pipe(map((data) => data));
     
      return http;
    } catch (err) {
      console.log(err);
      // disable the loader and return if there is an error
      return err;
    }
  }

  // get applicants api
  syncApplicants(endDate: string): Observable<any> {
    try {
      // get the data from the url

      var data = {
        endDate: endDate
      }

      console.log(data);
      var http = this.http
        .post<any>(APPLICANTS_SYNC_API, data, { headers: httpOptions })
        .pipe(map((data) => data));
     
      return http;
    } catch (err) {
      console.log(err);
      // disable the loader and return if there is an error
      return err;
    }
  }
}
