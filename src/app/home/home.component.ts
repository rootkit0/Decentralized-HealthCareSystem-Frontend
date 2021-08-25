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
    this.getData();
  }

  ngOnInit(): void {
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
