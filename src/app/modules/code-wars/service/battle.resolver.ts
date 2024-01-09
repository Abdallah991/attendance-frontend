import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { CodeWarsService } from './code-wars.service';

@Injectable({
  providedIn: 'root',
})
export class BattleResolver implements Resolve<boolean> {
  constructor(private CWS: CodeWarsService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    let battleId = route.params.battleId;

    console.log(battleId);

    // get candidate by Id
    return this.CWS.getBattleById(battleId).pipe(
      catchError((error) => {
        return of('No data');
      }),
      first()
    );
  }
}
