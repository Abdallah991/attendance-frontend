import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { VacationsService } from './vacations.service';
import { catchError, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class VacationsResolver implements Resolve<any> {
  constructor(private VS: VacationsService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    let studentId = route.params.studentId;

    // get vacations by student's id
    return this.VS.getVacationByStudentId(studentId).pipe(
      catchError((error) => {
        return of('No data');
      }),
      first()
    );
  }
}
