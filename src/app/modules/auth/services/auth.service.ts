import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  LOGIN_API,
  LOGOUT_API,
  PASSWORD_API,
  ROLES_API,
  UPDATE_TOKEN_API,
} from 'src/app/constants/api';
import { TOKENSUBJECT } from 'src/app/constants/constants';
import { getToken, getUser } from 'src/app/constants/globalMethods';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + getToken(),
  });
  // retrieves email and password then sends a http request if successful
  // returns a token
  public async login(email, password): Promise<any> {
    var data = {
      email: email,
      password: password,
    };

    let promise = new Promise<any>(async (resolve, reject) => {
      this.http.post(LOGIN_API, data).subscribe(
        (response) => {
          TOKENSUBJECT.next(response['data']['token']);
          // console.log(response); //! save this value locally then use it, the laravel generated token
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });

    return promise;
  }

  // change password
  public async changePassword(oldPassword, newPassword): Promise<any> {
    var data = {
      oldPassword: oldPassword,
      newPassword: newPassword,
      // get value of the user
      id: getUser().id,
    };

    let promise = new Promise<any>(async (resolve, reject) => {
      this.http
        .post(PASSWORD_API, data, { headers: this.httpOptions })
        .subscribe(
          (response) => {
            resolve(response);
          },
          (error) => reject(error)
        );
    });

    return promise;
  }

  // Logout implementation
  public async logout(): Promise<any> {
    try {
      let promise = new Promise<any>(async (resolve, reject) => {
        this.http.post(LOGOUT_API, { headers: this.httpOptions }).subscribe(
          (response) => {
            resolve(response);
          },
          (error) => reject(error)
        );
      });

      await promise
        .then((response) => {
          return response;
        })
        .catch((error) => {
          return error;
        });
    } catch (error) {
      console.log(error);
    }
  }

  // update token if expired api call to the backend
  public async updateToken(): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      this.http.get(UPDATE_TOKEN_API, { headers: this.httpOptions }).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => reject(error)
      );
    });
  }

  public async roles(): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      this.http.get(ROLES_API, { headers: this.httpOptions }).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => reject(error)
      );
    });
  }

  // public update

  // public getToken(): string {
  //   return TOKEN.value;
  // }
}
