import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { UserRoles } from '../models/user-roles';
import { AuthService } from './auth.service';
import { BlockchainService } from './blockchain.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  private userRole: string = "";

  constructor(private authService: AuthService, private router: Router, private blockchainService: BlockchainService) { }

  public async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    const allowedUserRole = this.getRoutePermissions(route);
    return this.checkPermission(allowedUserRole);
  }

  private getRoutePermissions(route: ActivatedRouteSnapshot) {
    if(route.data && route.data.userRole) {
      return route.data.userRole as UserRoles;
    }
    return null as any;
  }

  private async checkPermission(allowedUserRole: UserRoles) {
    //Check that user is authenticated
    if(!this.authService.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    //Check user role
    else {
      try {
        this.userRole = await this.blockchainService.getUserRole();
        if(this.userRole == UserRoles.ADMIN || !allowedUserRole) {
          return true;
        }
        if(this.userRole == UserRoles.DOCTOR && allowedUserRole == UserRoles.DOCTOR) {
          return true;
        }
        if(this.userRole == UserRoles.PATIENT && (allowedUserRole == UserRoles.DOCTOR || allowedUserRole == UserRoles.PATIENT)) {
          return true;
        }
      }
      catch(err) {
        this.router.navigate(['/home']);
        console.log(err);
      }
    }
    return false;
  }
}
