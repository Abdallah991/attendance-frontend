import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { OverviewService } from './overview.service';
import { Observable, of } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OverviewResolver implements Resolve<any> {
  // constructor(private OS: OverviewService) {}

  resolve(): Observable<any> {
    //   // get all students
    //   return this.OS.getAllPlatfomUsers().pipe(
    //     catchError((error) => {
    //       console.log(error);
    return of('No data');
    //     }),
    //     first()
    //   );
    // return 'No data';
  }
}
