import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Cohort } from 'src/app/models/Cohort';
import { CohortService } from './cohort.service';

@Injectable({
  providedIn: 'root',
})
export class CohortResolver implements Resolve<any> {
  constructor(private CS: CohortService) {}

  resolve() {
    // get all cohorts
    return this.CS.getCohorts()
      .then((result) => {
        var cohorts: Cohort[] = result;
        return cohorts;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  }
}
