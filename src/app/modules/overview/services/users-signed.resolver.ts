import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { getCurrentDate, getDate7Days } from 'src/app/constants/globalMethods';
import { OverviewService } from './overview.service';

@Injectable({
  providedIn: 'root',
})
export class UsersSignedResolver implements Resolve<boolean> {
  constructor(private OS: OverviewService) {}

  resolve(): Observable<any> {
    // get all students
    // return this.OS.getAllUsersWithDateRange(
    //   getDate7Days(),
    //   getCurrentDate()
    // ).pipe(
    //   catchError((error) => {
    return of('No data');
    //   }),
    //   first()
    // );
  }
}
