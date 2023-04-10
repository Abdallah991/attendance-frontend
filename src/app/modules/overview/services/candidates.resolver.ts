import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { CandidatesService } from './candidates.service';
import { Observable, of } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CandidatesResolver implements Resolve<any> {
  constructor(private CS: CandidatesService) {}

  resolve(): Observable<any> {
    // get all students
    return this.CS.getAllPlatfomUsers().pipe(
      catchError((error) => {
        return of('No data');
      }),
      first()
    );
  }
}
