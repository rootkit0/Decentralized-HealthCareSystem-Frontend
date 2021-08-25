import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../services/auth.service';
import { BlockchainService } from '../services/blockchain.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  //Declare view fields
  idCardNumber: string = "";
  healthCardId: string = "";
  password: string = "";
  //Icons
  faEye = faEye;
  
  constructor(private authService: AuthService, private router: Router, private blockchainService: BlockchainService) {
    if(this.authService.isAuthenticated()) {
      this.router.navigate(["/home"]);
    }
  }

  ngOnInit(): void {
  }

  logIn() {
    this.blockchainService.loginUser(this.idCardNumber, this.healthCardId, this.password);
  }
}
