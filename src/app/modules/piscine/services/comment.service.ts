import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  SP_APPLICANT_COMMENT_API,
  SP_DECISION_API,
  UPDATE_STUDENT_COMMENT,
  UPLOAD_IMAGE,
  UPLOAD_STUDENT,
} from 'src/app/constants/api';
import { getToken } from 'src/app/constants/globalMethods';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}

  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + getToken(),
  });

  httpOptionsImage = new HttpHeaders({
    // 'Content-Type': 'multipart/form-data',
    Authorization: 'Bearer ' + getToken(),
  });

  updateApplicantsComment(data): Observable<any> {
    try {
      // get the data from the url
      var http = this.http
        .post<any>(SP_APPLICANT_COMMENT_API, data, {
          headers: this.httpOptions,
        })
        .pipe(map((data) => data));
      return http;
    } catch (err) {
      console.log(err);
      // disable the loader and return if there is an error
      return err;
    }
  }

  updateApplicantDecision(data): Observable<any> {
    try {
      // get the data from the url
      var http = this.http
        .post<any>(SP_DECISION_API, data, {
          headers: this.httpOptions,
        })
        .pipe(map((data) => data));
      return http;
    } catch (err) {
      console.log(err);
      // disable the loader and return if there is an error
      return err;
    }
  }

  uploadImage(file): Observable<any> {
    try {
      // get the data from the url
      var http = this.http
        .post<any>(UPLOAD_IMAGE, file, {
          headers: this.httpOptionsImage,
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

  uploadStudentImage(file): Observable<any> {
    try {
      // get the data from the url
      var http = this.http
        .post<any>(UPLOAD_STUDENT, file, {
          headers: this.httpOptionsImage,
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

  updateStudentComment(data): Observable<any> {
    try {
      // get the data from the url
      var http = this.http
        .post<any>(UPDATE_STUDENT_COMMENT, data, {
          headers: this.httpOptions,
        })
        .pipe(map((data) => data));
      return http;
    } catch (err) {
      console.log(err);
      // disable the loader and return if there is an error
      return err;
    }
  }
}
