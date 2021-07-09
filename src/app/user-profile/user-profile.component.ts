import { Component, OnInit } from '@angular/core';
import { Doctor } from '../models/doctor';
import { Patient } from '../models/patient';
import { BlockchainService } from '../services/blockchain.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userRole: string = "patient";
  patient: Patient = new Patient();
  doctor: Doctor = new Doctor();

  constructor() {
    if(this.userRole == "patient") {
      //Get patient data
    }
    else if(this.userRole == "doctor") {
      //Get doctor data
    }
    else if(this.userRole == "admin") {
      //Get admin data
    }
    else {
      //ERROR
    }
  }

  ngOnInit(): void {
  }

}
