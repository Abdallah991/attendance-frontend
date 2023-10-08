import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  APPLICANTS_API,
  APPLICANTS_SYNC_API,
  APPLICANTS_UPDATE_API,
  CHECK_IN_API,
  SP_API,
} from 'src/app/constants/api';
import { getToken } from 'src/app/constants/globalMethods';

@Injectable({
  providedIn: 'root',
})
export class ApplicantsService {
  constructor(private http: HttpClient) {}
  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + getToken(),
  });
  // get applicants api
  getApplicants(data: any): Observable<any> {
    try {
      // get the data from the url

      console.log(data);
      var http = this.http
        .post<any>(APPLICANTS_API, data, { headers: this.httpOptions })
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
        endDate: endDate,
      };
      console.log(data);
      var http = this.http
        .post<any>(APPLICANTS_SYNC_API, data, { headers: this.httpOptions })
        .pipe(map((data) => data));
      console.log(http);
      return http;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  // get checkin count api
  checkInCount(eventId): Observable<any> {
    try {
      // get the data from the url
      var data = {
        eventId: eventId,
      };

      var http = this.http
        .post<any>(CHECK_IN_API, data, { headers: this.httpOptions })
        .pipe(map((data) => data));

      return http;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  // get checkin count api
  updateApplicant(platfromId: string, status: string): Observable<any> {
    try {
      // get the data from the url
      var data = {
        platformId: platfromId,
        status: status,
      };
      var http = this.http
        .post<any>(APPLICANTS_UPDATE_API, data, { headers: this.httpOptions })
        .pipe(map((data) => data));
      return http;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  // get checkin count api
  spCount(): Observable<any> {
    try {
      // get the data from the url
      var http = this.http
        .get<any>(SP_API, { headers: this.httpOptions })
        .pipe(map((data) => data));
      return http;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
