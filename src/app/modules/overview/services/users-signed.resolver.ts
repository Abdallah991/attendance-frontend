import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CandidatesService } from './overview.service';
import { catchError, first } from 'rxjs/operators';
import { getCurrentDate, getDate7Days } from 'src/app/constants/globalMethods';

@Injectable({
  providedIn: 'root',
})
export class UsersSignedResolver implements Resolve<boolean> {
  constructor(private CS: CandidatesService) {}

  resolve(): Observable<any> {
    // get all students
    return this.CS.getAllUsersWithDateRange(
      getDate7Days(),
      getCurrentDate()
    ).pipe(
      catchError((error) => {
        return of('No data');
      }),
      first()
    );
  }
}
