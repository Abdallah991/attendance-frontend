import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ATTENDNACE_API,
  CANDIDATE_API,
  SEARCH_API,
  STUDENT_API,
} from 'src/app/constants/api';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  constructor(private http: HttpClient) {}

  // get students api
  getStudents(): Observable<any> {
    try {
      // get the data from the url
      var http = this.http.get<any>(STUDENT_API).pipe(map((data) => data));
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
  // getCandidatesPagination(page): Observable<any> {
  //   try {
  //     // get the data from the url
  //     var response = this.http
  //       .get<any>(ATTENDNACE_API + page)
  //       .pipe(map((data) => data));

  //     return response;
  //   } catch (err) {
  //     console.log(err);
  //     return null;
  //   }
  // }

  // getAttendanceForCandidate(candidateId): Observable<any> {
  //   try {
  //     // get the data from the url
  //     var response = this.http
  //       .get<any>(CANDIDATE_API + candidateId)
  //       .pipe(map((data) => data));

  //     response.subscribe((value) => {
  //       console.log(value);
  //     });

  //     return response;
  //   } catch (err) {
  //     console.log(err);
  //     return null;
  //   }
  // }

  // get candidate by id api
  getStudentById(id): Observable<any> {
    try {
      // get the data from the url
      var response = this.http
        .get<any>(STUDENT_API + id)
        .pipe(map((data) => data));

      return response;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  // search candidate from biotime
  async searchStudent(searchValue): Promise<any> {
    try {
      // get the data from the url
      // pass the search value as an argument
      var response = this.http
        .get<any>(SEARCH_API + '?searchValue=' + searchValue)
        .pipe(map((data) => data));
      // return an observable
      return response;
    } catch (err) {
      //  catch the error and return an error
      console.log(err);
      return {
        error: err,
      };
    }
  }
}
