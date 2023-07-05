import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LOGIN_API, LOGOUT_API, PASSWORD_API } from 'src/app/constants/api';
import { httpOptions } from 'src/app/constants/constants';
import { getUser } from 'src/app/constants/globalMethods';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  // retrieves email and password then sends a http request if successful
  // returns a token
  public async login(email, password): Promise<any> {
    var token;
    var data = {
      email: email,
      password: password,
    };

    let promise = new Promise<any>(async (resolve, reject) => {
      this.http.post(LOGIN_API, data, { headers: httpOptions }).subscribe(
        (response) => {
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
      this.http.post(PASSWORD_API, data, { headers: httpOptions }).subscribe(
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
        this.http.post(LOGOUT_API, { headers: httpOptions }).subscribe(
          (response) => {
            resolve(response);
          },
          (error) => reject(error)
        );
      });

      await promise
        .then((response) => {
          console.log('response from backend', response);

          return response;
        })
        .catch((error) => {
          return error;
        });
    } catch (error) {
      console.log(error);
    }
  }
}
