import { Injectable } from '@angular/core';
import { STUDENT_API } from 'src/app/constants/api';
import { Student } from 'src/app/models/Student';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  /* -------------------------------- get students ------------------------------- */
  private getStudentApi(): Observable<Student[]> {
    try {
      // get the data from the url
      return this.http
        .get<Student[]>(STUDENT_API, this.httpOptions)
        .pipe(
          map((data) => data['data'].map((student) => new Student(student)))
        );
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  /* -------------------------- get the students promise ------------------------- */
  public async getStudents(): Promise<Student[]> {
    // declare students array
    var students: Student[];
    // call the promise of the API
    let promise = new Promise<any>(async (resolve, reject) => {
      this.getStudentApi().subscribe(
        (students) => resolve(students),
        (error) => reject(error)
      );
    });

    // promise if its resolved or rejected
    await promise
      .then((value) => {
        students = value;
        console.log('the value of students is ', students);
      })
      .catch((err) => {
        console.log('error message ', err);
      });

    // return the students
    return students;
  }
}
