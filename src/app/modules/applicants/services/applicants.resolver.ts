import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ApplicantsService } from './applicants.service';
import { catchError, first } from 'rxjs/operators';
import { formatYYYYDDMM } from 'src/app/constants/globalMethods';

@Injectable({
  providedIn: 'root',
})
export class ApplicantsResolver implements Resolve<any> {
  constructor(private AS: ApplicantsService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    // create a default date that is tomorrow
    var todayDate = new Date();
    todayDate.setDate(todayDate.getDate() + 1);
    // format it to have the format graphQL understands
    var tomorrowDate = formatYYYYDDMM(todayDate);
    // if there is a start date, its it, if not its may 14th
    var startDate = route.queryParamMap.get('startDate')
      ? route.queryParamMap.get('startDate')
      : '2023-11-19';
    // if there is a end date, its it, if not its tomorrow
    var endDate = route.queryParamMap.get('endDate')
      ? route.queryParamMap.get('endDate')
      : tomorrowDate;

    var sort = route.queryParamMap.get('sort')
      ? route.queryParamMap.get('sort')
      : 'descending';
    var status = route.queryParamMap.get('status')
      ? route.queryParamMap.get('status')
      : 'all';

    var gradeStart = route.queryParamMap.get('gradeStart')
      ? route.queryParamMap.get('gradeStart')
      : 'all';
    var gradeEnd = route.queryParamMap.get('gradeEnd')
      ? route.queryParamMap.get('gradeEnd')
      : 'all';

    var data: any = {
      startDate: startDate,
      endDate: endDate,
      sort: sort,
      gradeEnd: gradeEnd,
      gradeStart: gradeStart,
      status: status,
    };

    // get all applicants within a set date
    return this.AS.getApplicants(data).pipe(
      catchError((error) => {
        return of('No data');
      }),
      first()
    );
  }
}
