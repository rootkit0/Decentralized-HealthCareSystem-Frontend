import { ChangeDetectorRef } from '@angular/core';
import { Component, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

import { faBars, faSignInAlt, faUserPlus, faSignOutAlt, faUserCircle, faUserShield, faKey, faHeart, faFileMedical, faBookMedical, faUserMd } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { BlockchainService } from './services/blockchain.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  blockchainAccount: any;
  isAuthenticated: boolean = false;
  userRole: any;
  //Responsive stuff
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  //Icons
  faBars = faBars;
  faSignInAlt = faSignInAlt;
  faUserPlus = faUserPlus;
  faSignOutAlt = faSignOutAlt;
  faUserCircle = faUserCircle;
  faUserShield = faUserShield;
  faKey = faKey;
  faHeart = faHeart;
  faFileMedical = faFileMedical;
  faBookMedical = faBookMedical;
  faUserMd = faUserMd;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private authService: AuthService, private blockchainService: BlockchainService, private router: Router) {
    //Responsive stuff
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    //Get data
    this.getData();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  private async getData() {
    //Get blockchain account
    this.blockchainAccount = await this.blockchainService.getDefaultAccount();
    //Check auth
    this.isAuthenticated = this.authService.isAuthenticated();
    //Get user role
    if(this.isAuthenticated) {
      this.userRole = await this.blockchainService.readUserRole();
    }
  }

  logout(): void {
    this.authService.removeToken();
    window.location.reload();
  }
}
