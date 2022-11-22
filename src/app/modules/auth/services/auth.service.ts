import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LOGIN_API, LOGOUT_API } from 'src/app/constants/api';
import { httpOptions } from 'src/app/constants/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  // retrieves email and password then sends a http request if successful
  // returns a token
  public async login(email, password): Promise<any> {
    var LoginSuccessful = false;
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
        (error) => reject(error)
      );
    });

    await promise
      .then((response) => {
        // TODO: this depends on how to manage the session
        // TODO: Modify later
        LoginSuccessful = true;
        console.log('response from backend', response.data);
        token = response.data['token'];
        sessionStorage.setItem('user', JSON.stringify(response.data.users));
        sessionStorage.setItem('userID', response.data.users.id);
        sessionStorage.setItem('signinToken', token);
        return response.data.token;
      })
      .catch((error) => {
        LoginSuccessful = false;
        return LoginSuccessful;
      });

    // return the value of the call
    // return LoginSuccessful;
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
