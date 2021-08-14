import { ChangeDetectorRef } from '@angular/core';
import { Component, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

import { faBars, faSignInAlt, faSignOutAlt, faUserCircle, faUserPlus, faHeart } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  isAuthenticated: boolean = false;

  //Icons
  faBars = faBars;
  faUserCircle = faUserCircle;
  faSignOutAlt = faSignOutAlt;
  faSignInAlt = faSignInAlt;
  faUserPlus = faUserPlus;
  faHeart = faHeart;
  //Responsive stuff
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private authService: AuthService, private router: Router) {
    //Responsive stuff
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    //Check authentication
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logout(): void {
    this.authService.removeToken();
    this.router.navigate(["/login"]);
    window.location.reload();
  }
}
