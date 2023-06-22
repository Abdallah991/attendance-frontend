import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ATTENDNACE_API, SEARCH_API, STUDENT_API } from 'src/app/constants/api';

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
      return err;
    }
  }

  public deleteStudent(id: number): Promise<any> {
    let promise = new Promise<any>(async (resolve, reject) => {
      this.http.delete<any>(STUDENT_API + '/' + id).subscribe(
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
    console.log('the value of the promise ');
    return promise;
  }

  public async addStudent(student: any): Promise<any> {
    let promise = new Promise<any>(async (resolve, reject) => {
      this.http.post<any>(STUDENT_API, student).subscribe(
        (value) => {
          console.log(value);
          resolve(value);
        },
        (error) => {
          console.log('the api call failed: ', error);
          reject(error);
        }
      );
    });
    // deactivate the loader
    console.log('the value of the promise ');
    return promise;
  }

  // get candidate by id api
  getStudentById(id): Observable<any> {
    try {
      // get the data from the url
      var response = this.http
        .get<any>(STUDENT_API + '/' + id)
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
      this.http.post<any>(SEARCH_API, searchValue).subscribe(
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
        .get<any>(ATTENDNACE_API + '/' + id)
        .pipe(map((data) => data));
      return response;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
