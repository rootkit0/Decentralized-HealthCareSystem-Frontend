import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { BlockchainService } from '../services/blockchain.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  blockchainAccount: any;
  isAuthenticated: boolean = false;
  userRole: any;

  constructor(private authService: AuthService, private blockchainService: BlockchainService, private router: Router) {
    //Get blockchain account
    this.getBlockchainAccount();
    //Check authentication and get user role
    this.isAuthenticated = this.authService.isAuthenticated();
    if(this.isAuthenticated) {
      this.getUserRole();
    }
  }

  ngOnInit(): void {
  }

  private async getBlockchainAccount() {
    this.blockchainAccount = await this.blockchainService.getDefaultAccount();
  }

  private async getUserRole() {
    this.userRole = await this.blockchainService.readUserRole();
  }

  logout(): void {
    this.authService.removeToken();
    this.router.navigate(["/login"]);
    window.location.reload();
  }
}
