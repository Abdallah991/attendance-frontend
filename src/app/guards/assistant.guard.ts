import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { getUser } from '../constants/globalMethods';
import { TEAM } from '../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class AssistantGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Implement your logic to check if the user is allowed to access the page
    // For example, you can check the user's role or any other condition
    // Assume is allowed is false
    var isAllowed = false;
    TEAM.forEach((element) => {
      // set to true only if logged in user is part of the team
      if (element === getUser().email) {
        isAllowed = true;
      }
    });
    /* Your logic to determine if the user is allowed */
    if (isAllowed) {
      return true; // Allow routing to the requested page
    } else {
      this.router.navigate(['/piscine']); // Redirect to the unauthorized page
      return false; // Prevent routing
    }
  }
}
