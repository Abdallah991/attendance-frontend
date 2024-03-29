import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ATTENDNACE_API,
  BIRTHDAYS_API,
  SEARCH_API,
  STATISTICS_API,
  STUDENT_API,
  SYNC_STUDENTS_API,
} from 'src/app/constants/api';
import { getToken } from 'src/app/constants/globalMethods';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  constructor(private http: HttpClient) {}

  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + getToken(),
  });
  // get students api
  getStudents(data?): Observable<any> {
    try {
      let httpParams = new HttpParams();
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          httpParams = httpParams.set(key, data[key]);
        }
      }
      console.log(data);
      // get the data from the url
      var http = this.http
        .get<any>(STUDENT_API, {
          headers: this.httpOptions,
          params: httpParams,
        })
        .pipe(map((data) => data));

      return http;
    } catch (err) {
      console.log(err);
      // disable the loader and return if there is an error
      return err;
    }
  }

  //
  public deleteStudent(id: number): Promise<any> {
    let promise = new Promise<any>(async (resolve, reject) => {
      this.http
        .delete<any>(STUDENT_API + '/' + id, { headers: this.httpOptions })
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
    // deactivate the loader
    return promise;
  }

  public async addStudent(student: any): Promise<any> {
    let promise = new Promise<any>(async (resolve, reject) => {
      this.http
        .post<any>(STUDENT_API, student, { headers: this.httpOptions })
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
    // deactivate the loader
    return promise;
  }

  public async updateStudent(student: any): Promise<any> {
    let promise = new Promise<any>(async (resolve, reject) => {
      this.http
        .put<any>(STUDENT_API + '/' + student.id, student, {
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
    // deactivate the loader
    return promise;
  }

  // get candidate by id api
  getStudentById(id): Observable<any> {
    try {
      // get the data from the url
      var response = this.http
        .get<any>(STUDENT_API + '/' + id, { headers: this.httpOptions })
        .pipe(map((data) => data));
      return response;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  // search students
  async searchStudent(searchValue): Promise<any> {
    let promise = new Promise<any>(async (resolve, reject) => {
      this.http
        .post<any>(SEARCH_API, searchValue, { headers: this.httpOptions })
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

  // attendance per Student
  // get candidate by id api
  getAttendanceById(id): Observable<any> {
    try {
      // get the data from the url
      var response = this.http
        .get<any>(ATTENDNACE_API + '/' + id, { headers: this.httpOptions })
        .pipe(map((data) => data));
      return response;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  // get students api
  getBirthdays(): Observable<any> {
    try {
      // get the data from the url
      var http = this.http
        .get<any>(BIRTHDAYS_API, { headers: this.httpOptions })
        .pipe(map((data) => data));
      http.subscribe((data) => {});
      return http;
    } catch (err) {
      console.log(err);
      // disable the loader and return if there is an error
      return err;
    }
  }

  // sync student api
  syncStudents(): Observable<any> {
    try {
      var http = this.http
        .get<any>(SYNC_STUDENTS_API, { headers: this.httpOptions })
        .pipe(map((data) => data));
      return http;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  // return an observable of students progress
  public syncStudentsProgress(): Observable<any> {
    try {
      // get the data from the url
      var http = this.http
        .get<any>(STATISTICS_API, { headers: this.httpOptions })
        .pipe(map((data) => data));

      return http;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
