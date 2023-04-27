import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { getCurrentDate } from 'src/app/constants/globalMethods';
import { GET_USERS, GET_USERS_SIGNED_RANGED } from 'src/app/constants/queries';

@Injectable({
  providedIn: 'root',
})
export class OverviewService {
  constructor() {}

  // return an observable users can subscribe to
  public getAllPlatfomUsers() {
    // try {
    // var data = from(
    //   this.apolloProvider.watchQuery({
    //     query: GET_USERS,
    //     // variables: {
    //     //   authorId: 12,
    //     // },
    //   }).valueChanges
    // ).pipe(map((res) => res['data']['user'], first()));
    // return data;
    // } catch (error) {
    //   console.log('the error is ', error);
    //   return from(error);
    // }
  }

  // return an observable users can subscribe to
  public getAllUsersWithDateRange(startDate, endDate) {
    // try {
    // } catch (error) {
    //   console.log('the error is ', error);
    //   return from(error);
    // }
  }
  ngOnDestroy() {}
}
