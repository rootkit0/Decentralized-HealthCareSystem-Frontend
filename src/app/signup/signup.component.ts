import { Component, OnInit } from '@angular/core';
import { faEye } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  hide = true;
  hideRepeat = true;
  //Declare view fields
  idCardNumber: string;
  healthCardId: string;
  password: string;
  repeatPassword: string;
  //Icons
  faEye = faEye;
  
  constructor() {
    this.idCardNumber = "";
    this.healthCardId = "";
    this.password = "";
    this.repeatPassword = "";
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
  }
}
