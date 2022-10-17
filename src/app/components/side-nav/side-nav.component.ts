import { Component, OnInit } from '@angular/core';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
} from '@angular/router';
import { navigationMenu } from 'src/app/constants/navigation';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  // loader, navigation, and logo
  navigationMenu = navigationMenu;
  loading = false;
  userImageUrl: string = '../../../assets/icons/logo.svg';

  constructor(public router: Router) {
    // incase of any router
    this.router.events.subscribe((ev) => {
      // show loader
      if (ev instanceof NavigationStart) {
        this.loading = true;
      }
      // hide loader
      if (
        ev instanceof NavigationEnd ||
        ev instanceof NavigationCancel ||
        ev instanceof NavigationError
      ) {
        // set loader to false
        this.loading = false;
      }
    });
  }

  ngOnInit(): void {}

  signOut() {}
}
