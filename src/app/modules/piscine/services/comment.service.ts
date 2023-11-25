import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  SELECTION_POOL_API,
  SP_APPLICANT_COMMENT_API,
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
  updateApplicantsComment(data): Observable<any> {
    try {
      // get the data from the url
      console.log(this.httpOptions);
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
}
