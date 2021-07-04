import { Component, OnInit } from '@angular/core';
import { BlockchainService } from '../services/blockchain.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(blockchainService: BlockchainService) {
    
  }

  ngOnInit(): void {
  }

}
