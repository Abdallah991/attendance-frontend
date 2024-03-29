import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  SEARCH_APPLICANTS_API,
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
  getSPApplicants(data): Observable<any> {
    try {
      let httpParams = new HttpParams();
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          httpParams = httpParams.set(key, data[key]);
        }
      }
      // get the data from the url
      var http = this.http
        .get<any>(SELECTION_POOL_API, {
          headers: this.httpOptions,
          params: httpParams,
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

  // search students
  async searchApplicants(searchValue): Promise<any> {
    let promise = new Promise<any>(async (resolve, reject) => {
      this.http
        .post<any>(SEARCH_APPLICANTS_API, searchValue, {
          headers: this.httpOptions,
        })
        .subscribe(
          (value) => {
            resolve(value);
          },
          (error) => {
            console.log('the api call failed: ', error);
            reject(error);
          }
        );
    });
    // return promise
    return promise;
  }
}
