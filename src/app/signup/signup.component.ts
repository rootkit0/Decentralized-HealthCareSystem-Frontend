import { Component, OnInit } from '@angular/core';
import { faEye } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  hide = true;
  
  //Icons
  faEye = faEye;
  
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    
  }
}
