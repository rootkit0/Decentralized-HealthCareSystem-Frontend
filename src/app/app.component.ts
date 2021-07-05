import { ChangeDetectorRef } from '@angular/core';
import { Component, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

import { faBars, faSignInAlt, faSignOutAlt, faUserCircle, faUserPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'HealthCareSystem-Blockchain';

  //Icons
  faBars = faBars;
  faUserCircle = faUserCircle;
  faSignOutAlt = faSignOutAlt;
  faSignInAlt = faSignInAlt;
  faUserPlus = faUserPlus;
  //Responsive stuff
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    //Responsive stuff
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
