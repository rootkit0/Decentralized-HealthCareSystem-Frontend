import { Component, OnInit } from '@angular/core';
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

  constructor(private blockchainService: BlockchainService, private authService: AuthService) {
    this.getBlockchainAccount();
    //Check authentication
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  private async getBlockchainAccount() {
    await this.blockchainService.getDefaultAccount();
    this.blockchainAccount = this.blockchainService.defaultAccount;
  }

  logout(): void {
    this.authService.removeToken();
    window.location.reload();
  }

  ngOnInit(): void {
  }

}
