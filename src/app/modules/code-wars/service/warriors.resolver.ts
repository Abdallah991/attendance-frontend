import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { CodeWarsService } from './code-wars.service';

@Injectable({
  providedIn: 'root',
})
export class WarriorsResolver implements Resolve<any> {
  constructor(private CWS: CodeWarsService) {}

  resolve(): Observable<any> {
    // get all students
    return this.CWS.getWarriors().pipe(
      catchError((error) => {
        return of('No data');
      }),
      first()
    );
  }
}
