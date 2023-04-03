import { Injectable } from '@angular/core';
import { BIO_ATTENDANCE_API, STUDENT_API } from 'src/app/constants/api';
import { Student } from 'src/app/models/Student';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { httpOptions, httpOptionsBioTime } from 'src/app/constants/constants';
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
          map((data) =>
            data['data']['students'].map((student) => new Student(student))
          )
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
          map((data) => new Student(data['data']['student']))
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

  // delete student
  // TODO: Test this
  async deleteStudent(id: number): Promise<any> {
    // load the api
    var url = STUDENT_API + '/' + id;
    // call the api
    var newPost = await this.http
      .delete<any>(url, { headers: httpOptions })
      .subscribe(
        (value) => {
          return value;
        },
        (error) => {
          // console log the error
          console.log(error);
        }
      );
  }

  // update student
  // TODO: Test this later
  async updateStudent(student: any): Promise<any> {
    // load the api
    var url = STUDENT_API + '/' + student.id;
    // call the api
    this.http.put<any>(url, student, { headers: httpOptions }).subscribe(
      (value) => {
        return value;
      },
      (error) => {
        console.log(error);
        // console log the error
      }
    );
    // deactivate the loader
    return false;
  }

  // Add student
  // TODO: Test this later
  async addStudent(student: Student): Promise<any> {
    this.http
      .post<any>(STUDENT_API, student, { headers: httpOptions })
      .subscribe(
        (value) => {
          return value;
        },
        (error) => {
          // console log the error
          console.log(error);

          return null;
        }
      );
    return null;
  }

  // TODO: console log attendance from bio time
  // get attendance information
  public async getAttendance(): Promise<any> {
    try {
      // declare data array
      var data: any[];
      // call the promise of the API
      let promise = new Promise<any>(async (resolve, reject) => {
        this.getAttendanceApi().subscribe(
          (data) => resolve(data),
          (error) => reject(error)
        );
      });

      // promise if its resolved or rejected
      await promise
        .then((value) => {
          data = value;
        })
        .catch((err) => {
          console.log('error message ', err);
          if (err['status'] === 401) {
            console.log('the error is authorization');
          }
        });
    } catch (err) {
      console.log(err);
    }

    // return the attendance
    console.log('Attendnace', data);
    return data;
  }

  // get student API
  private getAttendanceApi(): Observable<any> {
    try {
      // get the data from the url
      return this.http
        .get<any>(BIO_ATTENDANCE_API, { headers: httpOptionsBioTime })
        .pipe(
          // access the JSON 'data'
          map((data) => data)
        );
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
