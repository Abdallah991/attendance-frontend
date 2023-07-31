import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { UsersService } from './users.service';
import { Observable, of } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RolesResolver implements Resolve<any> {
  constructor(private US: UsersService) {}

  resolve(): Observable<any> {
    // get all students
    return this.US.getRoles().pipe(
      catchError((error) => {
        return of('No data');
      }),
      first()
    );
  }
}
