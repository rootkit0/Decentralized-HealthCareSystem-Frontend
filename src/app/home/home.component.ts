import { Component, OnInit } from '@angular/core';
import { BlockchainService } from '../services/blockchain.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  blockchainAccount: any;

  constructor(private blockchainService: BlockchainService) {
    this.getBlockchainAccount();
    this.blockchainService.getDefaultAccount();
  }

  async getBlockchainAccount() {
    await this.blockchainService.getDefaultAccount();
    this.blockchainAccount = this.blockchainService.defaultAccount;
  }

  ngOnInit(): void {
  }

}
