import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import {
  getDateTomorrow,
  getDateYesterday,
} from 'src/app/constants/globalMethods';
import { OverviewService } from './overview.service';

@Injectable({
  providedIn: 'root',
})
export class LastdaySignedResolver implements Resolve<boolean> {
  constructor(private OS: OverviewService) {}

  resolve(): Observable<any> {
    // get all students
    return this.OS.getAllUsersWithDateRange(
      getDateYesterday(),
      getDateTomorrow()
    ).pipe(
      catchError((error) => {
        return of('No data');
      }),
      first()
    );
  }
}
