import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { COHORT_API } from 'src/app/constants/api';
import { httpOptions } from 'src/app/constants/constants';
import { getToken } from 'src/app/constants/globalMethods';
import { Cohort } from 'src/app/models/Cohort';

@Injectable({
  providedIn: 'root',
})
export class CohortService {
  constructor(private http: HttpClient) {}

  //  get students API call
  private getCohortsApi(): Observable<Cohort[]> {
    console.log('this is token ', getToken());
    try {
      // get the data from the url
      return this.http.get<Cohort[]>(COHORT_API, { headers: httpOptions }).pipe(
        // access the JSON 'data'
        map((data) =>
          data['data']['cohorts'].map((cohort) => new Cohort(cohort))
        )
      );
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  // get cohorts call
  public async getCohorts(): Promise<Cohort[]> {
    try {
      // declare cohorts array
      var cohorts: Cohort[];
      // call the promise of the API
      let promise = new Promise<any>(async (resolve, reject) => {
        this.getCohortsApi().subscribe(
          (cohorts) => resolve(cohorts),
          (error) => reject(error)
        );
      });

      // promise if its resolved or rejected
      await promise
        .then((value) => {
          cohorts = value;
        })
        .catch((err) => {
          console.log('error message ', err);
          if (err['status'] === 401) {
            console.log('the error is authorization');
            // this.cohorts();
            // TODO: find a replacement for this method
            window.location.reload();
          }
        });
    } catch (err) {
      console.log(err);
    }

    // return the cohorts
    return cohorts;
  }

  // get cohort API
  private getCohortApi(id): Observable<Cohort> {
    try {
      // get the data from the url
      return this.http
        .get<Cohort>(COHORT_API + '/' + id, { headers: httpOptions })
        .pipe(
          // access the JSON 'data'
          map((data) => new Cohort(data['data']['student']))
        );
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  // get cohort
  public async getCohort(id): Promise<Cohort> {
    // declare student variable
    var cohort: Cohort;

    // promise with resolve and reject of the API
    let promise = new Promise<any>(async (resolve, reject) => {
      this.getCohortApi(id).subscribe(
        (student) => resolve(student),
        (err) => reject(err)
      );
    });

    // wait for the promise
    await promise
      .then((result) => {
        cohort = result;
        console.log('the value of the cohort called is ', cohort);
      })
      .catch((err) => {
        console.log('error message ', err);
      });

    return cohort;
  }

  // delete cohort
  // TODO: Test this
  async deleteCohort(id: number): Promise<any> {
    // load the api
    var url = COHORT_API + '/' + id;
    // call the api
    var newPost = await this.http
      .delete<any>(url, { headers: httpOptions })
      .subscribe(
        (value) => {
          return value;
        },
        (error) => {
          // console log the error
          console.log(error);
        }
      );
  }

  // update cohort
  // TODO: Test this later
  async updateCohort(cohort: Cohort): Promise<any> {
    // load the api
    var url = COHORT_API + '/' + cohort.id;
    // call the api
    this.http.put<any>(url, cohort, { headers: httpOptions }).subscribe(
      (value) => {
        return value;
      },
      (error) => {
        console.log(error);
        // console log the error
      }
    );
    // deactivate the loader
    return false;
  }

  // Add cohort
  // TODO: Test this later
  async addCohort(cohort: Cohort): Promise<any> {
    this.http.post<any>(COHORT_API, cohort, { headers: httpOptions }).subscribe(
      (value) => {
        return value;
      },
      (error) => {
        // console log the error
        console.log(error);

        return null;
      }
    );
    return null;
  }
}
