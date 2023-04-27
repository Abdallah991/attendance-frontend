import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CandidatesService } from './candidates.service';
import { catchError, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ViewCandidateResolver implements Resolve<any> {
  constructor(private CS: CandidatesService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    let candidateId = route.params.candidateId;
    console.log('the candidates emp_code ', candidateId);

    // get candidate by Id
    return this.CS.getCandidateById(candidateId).pipe(
      catchError((error) => {
        return of('No data');
      }),
      first()
    );
  }
}
