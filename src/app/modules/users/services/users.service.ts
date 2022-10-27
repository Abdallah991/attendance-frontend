import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { USER_API } from 'src/app/constants/api';
import { httpOptions } from 'src/app/constants/constants';
import { User } from 'src/app/models/User';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  //  get users API call
  private getUsersApi(): Observable<User[]> {
    try {
      // get the data from the url
      return this.http.get<User[]>(USER_API, { headers: httpOptions }).pipe(
        // access the JSON 'data'
        map((data) => data['data'].map((user) => new User(user)))
      );
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  // get users call
  public async getUsers(): Promise<User[]> {
    // declare users array
    var users: User[];
    // call the promise of the API
    let promise = new Promise<any>(async (resolve, reject) => {
      this.getUsersApi().subscribe(
        (users) => resolve(users),
        (error) => reject(error)
      );
    });

    // promise if its resolved or rejected
    await promise
      .then((value) => {
        users = value;
      })
      .catch((err) => {
        console.log('error message ', err);
      });

    // return the users
    return users;
  }

  // get user API
  private getUserApi(id): Observable<User> {
    try {
      // get the data from the url
      return this.http
        .get<User>(USER_API + '/' + id, { headers: httpOptions })
        .pipe(
          // access the JSON 'data'
          map((data) => new User(data['data']))
        );
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  // get user
  public async getUser(id): Promise<User> {
    // declare user variable
    var user: User;

    // promise with resolve and reject of the API
    let promise = new Promise<any>(async (resolve, reject) => {
      this.getUserApi(id).subscribe(
        (user) => resolve(user),
        (err) => reject(err)
      );
    });

    // wait for the promise
    await promise
      .then((result) => {
        user = result;
        console.log('the value of the student called is ', user);
      })
      .catch((err) => {
        console.log('error message ', err);
      });

    return user;
  }
}
