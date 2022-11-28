import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { User } from 'src/app/models/User';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class EditUserResolver implements Resolve<any> {
  constructor(private US: UsersService) {}

  resolve(route: ActivatedRouteSnapshot) {
    // get the food id
    let userId = route.params.userId;
    // return the food
    return this.US.getUser(userId)
      .then((res) => {
        var user: User = res;
        return user;
      })
      .catch((err) => {
        console.log(err);
        return 'NO DATA';
      });
  }
}
