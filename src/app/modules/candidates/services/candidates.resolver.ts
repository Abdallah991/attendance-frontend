import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CandidatesService } from './candidates.service';
import { catchError, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CandidatesResolver implements Resolve<any> {
  constructor(private CS: CandidatesService) {}

  resolve(): Observable<any> {
    // get all students
    return this.CS.getCandidatesAPI().pipe(
      catchError((error) => {
        return of('No data');
      }),
      first()
    );
  }
}
