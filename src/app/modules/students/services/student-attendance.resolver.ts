import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { StudentsService } from './students.service';
import { catchError, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StudentAttendanceResolver implements Resolve<any> {
  constructor(private SS: StudentsService) {}

  resolve(
    route: ActivatedRouteSnapshot // : Observable<any>
  ) {
    let studentId = route.params.studentId;

    // get all student's attendnace record
    return this.SS.getAttendanceById(studentId).pipe(
      catchError((error) => {
        return of('No data');
      }),
      first()
    );
  }
}
