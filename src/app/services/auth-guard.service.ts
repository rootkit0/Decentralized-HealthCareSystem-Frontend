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
    const allowedUserRoles = this.getRoutePermissions(route);
    return this.checkPermission(allowedUserRoles);
  }

  private getRoutePermissions(route: ActivatedRouteSnapshot) {
    if (route.data && route.data.userRoles) {
      return route.data.userRoles as UserRoles[];
    }
    return null as any;
  }

  private async checkPermission(allowedUserRoles: UserRoles[]) {
    if(!this.authService.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    else {
      try {
        this.userRole = await this.blockchainService.getUserRole();
      }
      catch(err) {
        this.router.navigate(['home']);
        console.log(err);
      }
      if(this.userRole == UserRoles.ADMIN) {
        return true;
      }
      else {
        if(allowedUserRoles.includes(UserRoles.DOCTOR)) {
          if(this.userRole == UserRoles.DOCTOR) {
            return true;
          }
          else {
            return false;
          }
        }
      }
    }
    return false;
  }
}
