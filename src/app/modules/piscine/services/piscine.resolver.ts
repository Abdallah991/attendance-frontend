import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { PiscineService } from './piscine.service';
import { catchError, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PiscineResolver implements Resolve<any> {
  constructor(private PS: PiscineService) {}

  resolve(): Observable<any> {
    // get all students
    return this.PS.getSPApplicants().pipe(
      catchError((error) => {
        return of('No data');
      }),
      first()
    );
  }
}
