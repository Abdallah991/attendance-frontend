import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LOGIN_API } from 'src/app/constants/api';

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
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    let promise = new Promise<any>(async (resolve, reject) => {
      this.http.post(LOGIN_API, data, { headers }).subscribe(
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
        console.log(response);
        token = response.token;

        sessionStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('userID', response.user.id);
        localStorage.setItem('signinToken', token);
        return LoginSuccessful;
      })
      .catch((error) => {
        LoginSuccessful = false;
        return LoginSuccessful;
      });

    // return the value of the call
    // return LoginSuccessful;
  }
}
