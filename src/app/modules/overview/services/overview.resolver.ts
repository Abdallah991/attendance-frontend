import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { OverviewService } from './overview.service';
import { Observable, of } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OverviewResolver implements Resolve<any> {
  constructor(private OS: OverviewService) {}

  resolve(): Observable<any> {
    // get all students progress
    return this.OS.getStudentsProgress().pipe(
      catchError((error) => {
        //! test this on production
        return of('No data');
      }),
      first()
    );
  }
}
