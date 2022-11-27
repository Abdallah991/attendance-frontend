import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { StudentsService } from './students.service';
import { Student } from 'src/app/models/Student';

@Injectable({
  providedIn: 'root',
})
export class EditStudentResolver implements Resolve<any> {
  constructor(private SS: StudentsService) {}
  resolve(route: ActivatedRouteSnapshot) {
    // get the food id
    let studentId = route.params.studentId;
    // return the food
    return this.SS.getStudent(studentId)
      .then((res) => {
        var student: Student = res;
        return student;
      })
      .catch((err) => {
        console.log(err);
        return 'NO DATA';
      });
  }
}
