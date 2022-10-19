import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { User } from 'src/app/models/User';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class UsersResolver implements Resolve<any> {
  constructor(private US: UsersService) {}

  resolve() {
    // get all Users
    return this.US.getUsers()
      .then((result) => {
        var users: User[] = result;
        return users;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  }
}
