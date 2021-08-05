import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
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
  
  constructor(private authService: AuthService, private blockchainService: BlockchainService, private router: Router) {
    if(authService.isAuthenticated()) {
      this.router.navigate(["/home"]);
    }
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    try {
      this.blockchainService.loginUser(this.idCardNumber, this.healthCardId, this.password).then(
        ret => {
          this.router.navigate(["/user-profile"]);
          window.location.reload();
        }
      );
    }
    catch(err) {
      console.log(err);
    }
  }

}
