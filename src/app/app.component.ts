import { ChangeDetectorRef } from '@angular/core';
import { Component, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

import { faBars, faSignInAlt, faSignOutAlt, faUserCircle, faUserPlus, faHeart, faFileMedical } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { BlockchainService } from './services/blockchain.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  isAuthenticated: boolean = false;
  blockchainAccount: any;
  userRole: any;
  //Icons
  faBars = faBars;
  faUserCircle = faUserCircle;
  faSignOutAlt = faSignOutAlt;
  faSignInAlt = faSignInAlt;
  faUserPlus = faUserPlus;
  faHeart = faHeart;
  faFileMedical = faFileMedical;
  //Responsive stuff
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private authService: AuthService, private blockchainService: BlockchainService, private router: Router) {
    //Responsive stuff
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    //Check authentication
    this.isAuthenticated = this.authService.isAuthenticated();
    //Get blockchain account
    this.getData();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  private async getData() {
    //Get blockchain account
    this.blockchainAccount = await this.blockchainService.getDefaultAccount();
    //Get user role
    this.userRole = await this.blockchainService.readUserRole();
  }

  logout(): void {
    this.authService.removeToken();
    this.router.navigate(["/login"]);
    window.location.reload();
  }
}
