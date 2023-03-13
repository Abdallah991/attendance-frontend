import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


public const GET_POSTS = gql`
query GetPosts {
  posts {
    id
    title
  }
}
`
export class CandidatesService {


  loading: boolean;
  posts: any;


 
  private querySubscription: Subscription;

  constructor(private apollo: Apollo) {}

  public getUsers() {
  // this.querySubscription = this.apollo
  // .watchQuery<any>({
  //   query: GET_POSTS
  // })
  // .valueChanges.subscribe(({ data, loading }) => {
  //   this.loading = loading
  //   this.posts = data.posts
  // })
}


ngOnDestroy() {
this.querySubscription.unsubscribe()
}


}

