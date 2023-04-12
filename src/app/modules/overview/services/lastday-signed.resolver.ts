import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { GET_USERS_SIGNED_RANGED_1 } from 'src/app/constants/queries';
import { CandidatesService } from './candidates.service';

@Injectable({
  providedIn: 'root',
})
export class LastdaySignedResolver implements Resolve<boolean> {
  constructor(private CS: CandidatesService) {}

  resolve(): Observable<any> {
    // get all students
    return this.CS.getAllPlatfomUsersLastWeek(GET_USERS_SIGNED_RANGED_1).pipe(
      catchError((error) => {
        return of('No data');
      }),
      first()
    );
  }
}
