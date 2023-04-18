import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, from } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { getCurrentDate, getDate7Days } from 'src/app/constants/globalMethods';
import { GET_USERS, GET_USERS_SIGNED_RANGED } from 'src/app/constants/queries';

@Injectable({
  providedIn: 'root',
})
export class CandidatesService {
  loading: boolean;
  posts: any;

  constructor(private apollo: Apollo) {}

  // return an observable users can subscribe to
  public getAllPlatfomUsers(): Observable<any> {
    var data = from(
      this.apollo.watchQuery<any>({
        query: GET_USERS,
      }).valueChanges
    ).pipe(
      map((result) => result.data.user),
      first()
    );

    data.subscribe((data) => {
      console.log('the value of the users are ', data.value);
    });

    return data;
  }

  // return an observable users can subscribe to
  public getAllUsersWithDateRange(startDate, endDate): Observable<any> {
    console.log(getCurrentDate());
    var data = from(
      this.apollo.watchQuery<any>({
        query: GET_USERS_SIGNED_RANGED,
        variables: {
          currentDate: endDate,
          previousDate: startDate,
        },
      }).valueChanges
    ).pipe(
      map((result) => result.data.user),
      first()
    );
    return data;
  }
  ngOnDestroy() {}
}
