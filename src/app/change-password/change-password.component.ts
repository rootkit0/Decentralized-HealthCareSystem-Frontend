import { Component, OnInit } from '@angular/core';
import { BlockchainService } from '../services/blockchain.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  oldPassword: string = "";
  newPassword: string = "";
  repeatNewPassword: string = "";

  constructor(private blockchainService: BlockchainService) { }

  ngOnInit(): void {
  }

  validatePwdStrength(): boolean {
    if(this.newPassword != this.repeatNewPassword) {
      console.log("Passwords don't match!");
      return false;
    }
    //Common password patterns
    let commonPasswordPatterns = /passw.*|12345.*|09876.*|qwert.*|asdfg.*|zxcvb.*|footb.*|baseb.*|drago.*/;
    //Build up the strenth of our password
    let numberOfElements = 0;
    //Lowercase letters
    numberOfElements = /.*[a-z].*/.test(this.newPassword) ? ++numberOfElements : numberOfElements;
    //Uppercase letters
    numberOfElements = /.*[A-Z].*/.test(this.newPassword) ? ++numberOfElements : numberOfElements;
    //Numbers
    numberOfElements = /.*[0-9].*/.test(this.newPassword) ? ++numberOfElements : numberOfElements;
    //Special characters (inc. space)
    numberOfElements = /[^a-zA-Z0-9]/.test(this.newPassword) ? ++numberOfElements : numberOfElements;

    if (this.newPassword === null || this.newPassword.length < 5) {
      console.log("Password too weak!");
      return false;
    }
    if(commonPasswordPatterns.test(this.newPassword) === true) {
      console.log("Password too weak!");
      return false;
    }
    if (numberOfElements === 0 || numberOfElements === 1 || numberOfElements === 2) {
      console.log("Password too weak!");
      return false;
    }
    return true;
  }

  updatePassword() {
    if(this.validatePwdStrength()) {
      this.blockchainService.updateUserPassword(this.oldPassword, this.newPassword);
    }
  }
}
