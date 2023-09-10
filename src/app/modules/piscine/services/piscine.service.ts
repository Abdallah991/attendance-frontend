import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SELECTION_POOL_API } from 'src/app/constants/api';
import { httpOptions } from 'src/app/constants/constants';

@Injectable({
  providedIn: 'root',
})
export class PiscineService {
  constructor(private http: HttpClient) {}

  // get applicants api
  getSPApplicants(): Observable<any> {
    try {
      // get the data from the url
      var http = this.http
        .get<any>(SELECTION_POOL_API, { headers: httpOptions })
        .pipe(map((data) => data));
      return http;
    } catch (err) {
      console.log(err);
      // disable the loader and return if there is an error
      return err;
    }
  }
}
