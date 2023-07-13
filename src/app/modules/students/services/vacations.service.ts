import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { VACATION_API } from 'src/app/constants/api';
import { httpOptions } from 'src/app/constants/constants';

@Injectable({
  providedIn: 'root',
})
export class VacationsService {
  constructor(private http: HttpClient) {}

  // get Vacations api
  getVacations(): Observable<any> {
    try {
      // get the data from the url
      var http = this.http
        .get<any>(VACATION_API, { headers: httpOptions })
        .pipe(map((data) => data));
      http.subscribe((data) => {});
      return http;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  public deleteVacation(id: number): Promise<any> {
    let promise = new Promise<any>(async (resolve, reject) => {
      this.http
        .delete<any>(VACATION_API + '/' + id, { headers: httpOptions })
        .subscribe(
          (value) => {
            resolve(value);
          },
          (error) => {
            console.log('the api call failed: ', error);
            reject(error);
          }
        );
    });
    return promise;
  }

  public async addVacation(vacation: any): Promise<any> {
    let promise = new Promise<any>(async (resolve, reject) => {
      this.http
        .post<any>(VACATION_API, vacation, { headers: httpOptions })
        .subscribe(
          (value) => {
            resolve(value);
          },
          (error) => {
            console.log('the api call failed: ', error);
            reject(error);
          }
        );
    });
    // deactivate the loader
    return promise;
  }

  // get vacation by student's id API
  getVacationByStudentId(id): Observable<any> {
    try {
      // get the data from the url
      var response = this.http
        .get<any>(VACATION_API + '/' + id, { headers: httpOptions })
        .pipe(map((data) => data));
      return response;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
  // edit vacation
  editVacation(vacation): Promise<any> {
    let promise = new Promise<any>(async (resolve, reject) => {
      this.http
        .put<any>(VACATION_API + '/' + vacation['id'], vacation, {
          headers: httpOptions,
        })
        .subscribe(
          (value) => {
            resolve(value);
          },
          (error) => {
            console.log('the api call failed: ', error);
            reject(error);
          }
        );
    });
    return promise;
  }
}
