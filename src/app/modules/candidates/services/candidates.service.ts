import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ATTENDNACE_API,
  CANDIDATE_API,
  CANDIDATE_INFO_API,
} from 'src/app/constants/api';

@Injectable({
  providedIn: 'root',
})
export class CandidatesService {
  constructor(private http: HttpClient) {}

  // get departments api
  getCandidates(): Observable<any> {
    try {
      // get the data from the url
      var http = this.http.get<any>(ATTENDNACE_API).pipe(map((data) => data));
      http.subscribe((data) => {
        console.log(data);
      });
      console.log(http);
      return http;
    } catch (err) {
      console.log(err);
      // disable the loader and return if there is an error
      return null;
    }
  }

  // get departments api
  getCandidatesPagination(page): Observable<any> {
    try {
      // get the data from the url
      var response = this.http
        .get<any>(ATTENDNACE_API + page)
        .pipe(map((data) => data));

      return response;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  getAttendanceForCandidate(candidateId): Observable<any> {
    try {
      // get the data from the url
      var response = this.http
        .get<any>(CANDIDATE_API + candidateId)
        .pipe(map((data) => data));

      response.subscribe((value) => {
        console.log(value);
      });

      return response;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  // get candidate by id api
  getCandidateById(id): Observable<any> {
    try {
      // get the data from the url
      var response = this.http
        .get<any>(CANDIDATE_INFO_API + id)
        .pipe(map((data) => data));

      return response;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  // TODO: search candidates
  searchCandidate(searchValue) {
    try {
      // get the data from the url
      var http = this.http
        .post<any>(ATTENDNACE_API, {})
        .pipe(map((data) => data));
      http.subscribe((data) => {
        console.log(data);
      });
      console.log(http);
      http.subscribe((value) => {
        console.log(value, 'post request');
      });
      return http;
    } catch (err) {
      console.log(err);
      // disable the loader and return if there is an error
      return null;
    }
  }

  searchArray(searchValue) {}

  // get departments
  // public async getCandidates(): Promise<any> {
  //   // call the promise of the API
  //   let promise = new Promise<any>(async (resolve, reject) => {
  //     this.getCandidatesAPI().subscribe(
  //       (roles) => resolve(roles),
  //       (error) => reject(error)
  //     );
  //   });

  //   // promise if its resolved or rejected
  //   await promise
  //     .then((value) => {
  //       console.log(value);
  //       return value;
  //     })
  //     .catch((err) => {
  //       // console log the error

  //       // deactivate the loader
  //       console.log(err);
  //     });

  //   // return the roles
  //   return null;
  // }
}
