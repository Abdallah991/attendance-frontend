import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { PiscineService } from './piscine.service';
import { catchError, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PiscineCandidateResolver implements Resolve<boolean> {
  constructor(private PS: PiscineService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    let candidateId = route.params.candidateId;

    console.log(candidateId);

    // get candidate by Id
    return this.PS.getSpApplicant(candidateId).pipe(
      catchError((error) => {
        return of('No data');
      }),
      first()
    );
  }
}
