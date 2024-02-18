import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Resolve,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { StudentsService } from './students.service';
import { catchError, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StudentsResolver implements Resolve<any> {
  constructor(private SS: StudentsService) {}

  resolve(AR: ActivatedRouteSnapshot): Observable<any> {
    // get url paramters
    var sp = AR.queryParamMap.get('sp') ? AR.queryParamMap.get('sp') : 'all';
    var cohortId = AR.queryParamMap.get('cohortId')
      ? AR.queryParamMap.get('cohortId')
      : 'all';

    var data = {
      sp: sp,
      cohortId: cohortId,
    };

    return this.SS.getStudents(data).pipe(
      catchError((error) => {
        return of('No data');
      }),
      first()
    );
  }
}
