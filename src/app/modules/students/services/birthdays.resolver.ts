import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { StudentsService } from './students.service';
import { catchError, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BirthdaysResolver implements Resolve<any> {
  constructor(private SS: StudentsService) {}

  resolve(): Observable<any> {
    // get all students
    return this.SS.getBirthdays().pipe(
      catchError((error) => {
        return of('No data');
      }),
      first()
    );
  }
}
