import { Injectable } from '@angular/core';
import { STUDENT_API } from 'src/app/constants/api';
import { Student } from 'src/app/models/Student';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { httpOptions } from 'src/app/constants/constants';
import { getToken, getUser, getUserId } from 'src/app/constants/globalMethods';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  constructor(private http: HttpClient) {}

  //  get students API call
  private getStudentsApi(): Observable<Student[]> {
    console.log('this is token ', getToken());
    console.log('this is user ', getUser());
    console.log('this is user id ', getUserId());
    try {
      // get the data from the url
      return this.http
        .get<Student[]>(STUDENT_API, { headers: httpOptions })
        .pipe(
          // access the JSON 'data'
          map((data) => data['data'].map((student) => new Student(student)))
        );
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  // get students call
  public async getStudents(): Promise<Student[]> {
    try {
      // declare students array
      var students: Student[];
      // call the promise of the API
      let promise = new Promise<any>(async (resolve, reject) => {
        this.getStudentsApi().subscribe(
          (students) => resolve(students),
          (error) => reject(error)
        );
      });

      // promise if its resolved or rejected
      await promise
        .then((value) => {
          students = value;
        })
        .catch((err) => {
          console.log('error message ', err);
          if (err['status'] === 401) {
            console.log('the error is authorization');
            // this.getStudents();
            // TODO: find a replacement for this method
            window.location.reload();
          }
        });
    } catch (err) {
      console.log(err);
    }

    // return the students
    return students;
  }

  // get student API
  private getStudentApi(id): Observable<Student> {
    try {
      // get the data from the url
      return this.http
        .get<Student>(STUDENT_API + '/' + id, { headers: httpOptions })
        .pipe(
          // access the JSON 'data'
          map((data) => new Student(data['data']))
        );
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  // get student
  public async getStudent(id): Promise<Student> {
    // declare student variable
    var student: Student;

    // promise with resolve and reject of the API
    let promise = new Promise<any>(async (resolve, reject) => {
      this.getStudentApi(id).subscribe(
        (student) => resolve(student),
        (err) => reject(err)
      );
    });

    // wait for the promise
    await promise
      .then((result) => {
        student = result;
        console.log('the value of the student called is ', student);
      })
      .catch((err) => {
        console.log('error message ', err);
      });

    return student;
  }
}
