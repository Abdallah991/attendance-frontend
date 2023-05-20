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

  resolve(route: ActivatedRouteSnapshot) // : Observable<any>
  {
    let candidateId = route.params.candidateId;
    console.log('the candidates emp_code ', candidateId);

    // get all candidate attendnace record
    // return this.SS.getAttendanceForCandidate(candidateId).pipe(
    //   catchError((error) => {
    //     return of('No data');
    //   }),
    //   first()
    // );
  }
}
