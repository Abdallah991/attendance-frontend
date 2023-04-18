import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { CandidatesService } from './candidates.service';
import {
  getDateTomorrow,
  getDateYesterday,
} from 'src/app/constants/globalMethods';

@Injectable({
  providedIn: 'root',
})
export class LastdaySignedResolver implements Resolve<boolean> {
  constructor(private CS: CandidatesService) {}

  resolve(): Observable<any> {
    // get all students
    return this.CS.getAllUsersWithDateRange(
      getDateYesterday(),
      getDateTomorrow()
    ).pipe(
      catchError((error) => {
        return of('No data');
      }),
      first()
    );
  }
}
