import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CandidatesService } from './candidates.service';
import { catchError, first } from 'rxjs/operators';
import { GET_USERS_SIGNED_RANGED_7 } from 'src/app/constants/queries';

@Injectable({
  providedIn: 'root',
})
export class UsersSignedResolver implements Resolve<boolean> {
  constructor(private CS: CandidatesService) {}

  resolve(): Observable<any> {
    // get all students
    return this.CS.getAllPlatfomUsersLastWeek(GET_USERS_SIGNED_RANGED_7).pipe(
      catchError((error) => {
        return of('No data');
      }),
      first()
    );
  }
}
