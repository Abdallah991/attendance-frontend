import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, from } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { GET_USERS } from 'src/app/constants/queries';

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
    return data;
  }
  ngOnDestroy() {}
}
