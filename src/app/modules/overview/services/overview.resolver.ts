import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { StudentsService } from '../../students/services/students.service';

@Injectable({
  providedIn: 'root',
})
export class OverviewResolver implements Resolve<any> {
  constructor(private SS: StudentsService) {}

  resolve(): Observable<any> {
    // get all students progress
    return this.SS.getStudents().pipe(
      catchError((error) => {
        return of('No data');
      }),
      first()
    );
  }
}
