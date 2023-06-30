import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { StudentsService } from './students.service';
import { catchError, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ViewStudentResolver implements Resolve<any> {
  constructor(private SS: StudentsService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    let studentId = route.params.studentId;

    // console.log('the value of the student id ', studentId);

    // get candidate by Id
    return this.SS.getStudentById(studentId).pipe(
      catchError((error) => {
        return of('No data');
      }),
      first()
    );
  }
}
