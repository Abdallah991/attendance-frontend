import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { forkJoin } from 'rxjs';
import {
  ADD_WARRIOR_API,
  ADD_WARRIOR_BATTLE_API,
  CODE_WARS_API,
  CREATE_BATTLE_API,
  EDIT_BATTLE_API,
  GET_BATTLE_API,
  GET_WARRIORS_API,
  START_BATTLE_API,
} from 'src/app/constants/api';
import { catchError, map } from 'rxjs/operators';
import { getToken } from 'src/app/constants/globalMethods';

@Injectable({
  providedIn: 'root',
})
export class CodeWarsService {
  constructor(private http: HttpClient) {}

  // http options
  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + getToken(),
  });
  // * Add warrior to database
  addWarrior(data): Observable<any> {
    try {
      var http = this.http
        .post<any>(ADD_WARRIOR_API, data, {
          headers: this.httpOptions,
        })
        .pipe(map((data) => data));
      return http;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  // * get Warriors
  getWarriors(): Observable<any> {
    try {
      var http = this.http
        .get<any>(GET_WARRIORS_API, {
          headers: this.httpOptions,
        })
        .pipe(map((data) => data));

      return http;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  // * Get student data using Code Wars API
  getWarriorData(username: string): Observable<any> {
    const url = `${CODE_WARS_API}${username}`;
    return this.http.get(url).pipe(catchError(this.handleError));
  }
  // * Get students data using Code Wars API
  getWarriorsData(usernames: string[]): Observable<any[]> {
    const observables: Observable<any>[] = [];

    for (const username of usernames) {
      const url = `${CODE_WARS_API}${username}`;
      const userObservable = this.http.get(url);
      observables.push(userObservable);
    }

    return forkJoin(observables);
  }

  // create battle
  createBattle(data): Observable<any> {
    try {
      var http = this.http
        .post<any>(CREATE_BATTLE_API, data, {
          headers: this.httpOptions,
        })
        .pipe(map((data) => data));
      return http;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  // add warriors to battle
  addWarriorsTBattle(data) {
    try {
      var http = this.http
        .post<any>(ADD_WARRIOR_BATTLE_API, data, {
          headers: this.httpOptions,
        })
        .pipe(map((data) => data));
      return http;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  // get all battles
  getBattles(): Observable<any> {
    try {
      var http = this.http
        .get<any>(GET_BATTLE_API, {
          headers: this.httpOptions,
        })
        .pipe(map((data) => data));

      return http;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  // get battle by id
  getBattleById(id): Observable<any> {
    try {
      var http = this.http
        .get<any>(GET_BATTLE_API + '/' + id, {
          headers: this.httpOptions,
        })
        .pipe(map((data) => data));

      return http;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  // end battle
  // get battle by id
  updateBattle(id, data): Observable<any> {
    try {
      var http = this.http
        .put<any>(EDIT_BATTLE_API + '/' + id, data, {
          headers: this.httpOptions,
        })
        .pipe(map((data) => data));
      return http;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  // start battle
  startBattle(data): Observable<any> {
    try {
      var http = this.http
        .post<any>(START_BATTLE_API, data, {
          headers: this.httpOptions,
        })
        .pipe(map((data) => data));

      return http;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  // * handle error
  // handle error if user does not exisit
  private handleError(error: HttpErrorResponse): Observable<any> {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }

    // Return an observable with a user-facing error message.
    return throwError('Something went wrong. Please try again later.');
  }
}
