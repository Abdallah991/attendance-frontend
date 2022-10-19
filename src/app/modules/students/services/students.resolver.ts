import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Student } from 'src/app/models/Student';
import { StudentsService } from './students.service';

@Injectable({
  providedIn: 'root',
})
export class StudentsResolver implements Resolve<any> {
  constructor(private SS: StudentsService) {}

  resolve() {
    // get all students
    return this.SS.getStudents()
      .then((result) => {
        var students: Student[] = result;
        return students;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  }
}
