import { Component, OnInit } from '@angular/core';
import { faEye } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  hide = true;
  //Declare view fields
  idCardNumber: string;
  healthCardId: string;
  password: string;
  //Icons
  faEye = faEye;
  
  constructor() {
    this.idCardNumber = "";
    this.healthCardId = "";
    this.password = "";
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
  }

}
