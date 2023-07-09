import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { COHORT_API } from 'src/app/constants/api';
import { httpOptions } from 'src/app/constants/constants';

@Injectable({
  providedIn: 'root',
})
export class CohortsService {
  constructor(private http: HttpClient) {}

  // get departments api
  getCohorts(): Observable<any> {
    try {
      // get the data from the url
      var http = this.http
        .get<any>(COHORT_API, { headers: httpOptions })
        .pipe(map((data) => data));
      http.subscribe((data) => {
        // console.log(data);
      });
      // console.log(http);
      return http;
    } catch (err) {
      console.log(err);
      // disable the loader and return if there is an error
      return null;
    }
  }
}
