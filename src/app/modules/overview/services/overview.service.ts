import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { STATISTICS_API } from 'src/app/constants/api';
import { httpOptions } from 'src/app/constants/constants';
// import { GET_USERS, GET_USERS_SIGNED_RANGED } from 'src/app/constants/queries';

@Injectable({
  providedIn: 'root',
})
export class OverviewService {
  constructor(private http: HttpClient) {}

  // return an observable of students progress
  public getStudentsProgress(): Observable<any> {
    try {
      // get the data from the url
      var http = this.http
        .get<any>(STATISTICS_API, { headers: httpOptions })
        .pipe(map((data) => data));
      http.subscribe((data) => {});
      return http;
    } catch (err) {
      console.log(err);
      console.log(httpOptions);
      console.log(httpOptions.getAll);
      //! test this on production
      window.location.reload();
      return err;
    }
  }

  // return an observable users can subscribe to
  public getAllUsersWithDateRange(startDate, endDate) {
    // try {
    // } catch (error) {
    //   console.log('the error is ', error);
    //   return from(error);
    // }
  }
  ngOnDestroy() {}
}
