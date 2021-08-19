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
  
  constructor(private authService: AuthService, private router: Router, private blockchainService: BlockchainService) {
    if(this.authService.isAuthenticated()) {
      this.router.navigate(["/home"]);
    }
  }

  ngOnInit(): void {
  }

  validatePwdStrength(): boolean {
    if(this.password != this.repeatPassword) {
      console.log("Passwords don't match!");
      return false;
    }
    //Common password patterns
    let commonPasswordPatterns = /passw.*|12345.*|09876.*|qwert.*|asdfg.*|zxcvb.*|footb.*|baseb.*|drago.*/;
    //Build up the strenth of our password
    let numberOfElements = 0;
    //Lowercase letters
    numberOfElements = /.*[a-z].*/.test(this.password) ? ++numberOfElements : numberOfElements;
    //Uppercase letters
    numberOfElements = /.*[A-Z].*/.test(this.password) ? ++numberOfElements : numberOfElements;
    //Numbers
    numberOfElements = /.*[0-9].*/.test(this.password) ? ++numberOfElements : numberOfElements;
    //Special characters (inc. space)
    numberOfElements = /[^a-zA-Z0-9]/.test(this.password) ? ++numberOfElements : numberOfElements;

    if (this.password === null || this.password.length < 5) {
      console.log("Password too weak!");
      return false;
    }
    if(commonPasswordPatterns.test(this.password) === true) {
      console.log("Password too weak!");
      return false;
    }
    if (numberOfElements === 0 || numberOfElements === 1 || numberOfElements === 2) {
      console.log("Password too weak!");
      return false;
    }
    return true;
  }

  signUp() {
    if(this.validatePwdStrength()) {
      this.blockchainService.signupUser(this.idCardNumber, this.healthCardId, this.password);
    }
  }
}
