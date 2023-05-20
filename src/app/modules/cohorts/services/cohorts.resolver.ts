import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CohortsService } from './cohorts.service';
import { catchError, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CohortsResolver implements Resolve<any> {
  constructor(private CS: CohortsService) {}
  resolve(): Observable<any> {
    return this.CS.getCohorts().pipe(
      catchError((error) => {
        console.log(error);
        return of('No Data');
      }),
      first()
    );
  }
}
