import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { faEye } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  hide = true;
  
  //Icons
  faEye = faEye;
  
  constructor() { }

  ngOnInit(): void {
  }

  async onSubmit() {
    console.log("hola");
  }

}
