import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../services/auth.service';
import { BlockchainService } from '../services/blockchain.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  hide = true;
  hideRepeat = true;
  //Declare view fields
  idCardNumber: string = "";
  healthCardId: string = "";
  password: string = "";
  repeatPassword: string = "";
  //Icons
  faEye = faEye;
  
  constructor(private authService: AuthService, private blockchainService: BlockchainService, private router: Router) {
    if(this.authService.isAuthenticated()) {
      this.router.navigate(["/home"]);
    }
  }

  ngOnInit(): void {
  }

  async onSubmit() {
    try {
      await this.blockchainService.signupUser(this.idCardNumber, this.healthCardId, this.password).then(
        ret => {
          this.router.navigate(["/login"]);
        }
      );
    }
    catch(err) {
      console.log(err);
    }
  }
}
