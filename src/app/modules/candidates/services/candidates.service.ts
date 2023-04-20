import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BIO_ATTENDANCE_API, DEPARTMENT_API } from 'src/app/constants/api';
import { httpOptionsBioTime } from 'src/app/constants/constants';

@Injectable({
  providedIn: 'root',
})
export class CandidatesService {
  constructor(private http: HttpClient) {}

  // get departments api
  private getDepartmentsAPI(): Observable<any> {
    try {
      // get the data from the url
      var http = this.http
        .get<any>(DEPARTMENT_API, { headers: httpOptionsBioTime })
        .pipe(map((data) => data));
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

  // get departments
  public async getDepartments(): Promise<any> {
    // call the promise of the API
    let promise = new Promise<any>(async (resolve, reject) => {
      this.getDepartmentsAPI().subscribe(
        (roles) => resolve(roles),
        (error) => reject(error)
      );
    });

    // promise if its resolved or rejected
    await promise
      .then((value) => {
        return value;
      })
      .catch((err) => {
        // console log the error

        // deactivate the loader
        console.log(err);
      });

    // return the roles
    return null;
  }
}
