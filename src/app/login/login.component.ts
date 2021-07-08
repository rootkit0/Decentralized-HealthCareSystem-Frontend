import { Component, OnInit } from '@angular/core';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { BlockchainService } from '../services/blockchain.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  //Declare view fields
  idCardNumber: string;
  healthCardId: string;
  password: string;
  //Icons
  faEye = faEye;
  
  constructor(private blockchainService: BlockchainService) {
    this.idCardNumber = "";
    this.healthCardId = "";
    this.password = "";
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.blockchainService.loginUser(this.idCardNumber, this.healthCardId, this.password);
  }

}
