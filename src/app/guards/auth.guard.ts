import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { getToken } from '../constants/globalMethods';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // if value of token is null or empty
    // re-route to login to create a token
    if (getToken() == null || getToken() == '') {
      this.router.navigateByUrl('/login');
      return false;
    }
    // otherwise
    // allow routing
    else {
      return true;
    }
  }
}
